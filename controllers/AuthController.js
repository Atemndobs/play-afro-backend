import Country from "../models/country";
import authService from "../services/auth.service";
import commonService from "../utils/commonService";
import Subscription from "../models/subscription";
import moment from "moment";
import Joi from "joi";
import jwt from "jsonwebtoken";
import {
  APPROVED_STATUS,
  BCRYPT,
  JWT,
  ROLE,
} from "../common/constants/constant";
import User from "../models/users";
import bcrypt from "bcryptjs";
import AccessToken from "../models/accessToken";
import UserResource from "../resources/UserResource";
import Notification from "../models/notification";
class AuthController {
  /**
   * @description : Register service
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async postRegister(req, res, next) {
    // console.log(req.body)

    // return "hello";
    await authService.register(req.body, req.body.email);
    return res.redirect("/login");
    return res.send({ message: "Otp verification mail sent successfully" });
  }

  /**
   * Country
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async register(req, res, next) {
    let countries = await Country.findAll();
    return res.render("artist-register", { countries: countries });
    res.send({ message: "success" });
  }

  /**
   * Admin login
   * @param Request req
   * @param Response res
   */
  static async login(req, res, next) {
    try {
      const request = req.body;

      const schema = Joi.object().keys({
        email: Joi.string().email().required().messages({
          "string.empty": "Please enter email address.",
          "string.email": "email must be a valid email",
        }),
        password: Joi.string().required().messages({
          "string.empty": "Please enter password.",
        }),
      });

      const err = await schema.validate(request, {
        abortEarly: false,
      });

      if (err.error) {
        return res.render("login", { error: err.error, data: request });
      }

      const user = await commonService.findOne(
        User,
        { email: request.email },
        { raw: false, plain: true }
      );

      if (user) {
        const hashedPasswordMatch = await user.isPasswordMatch(
          request.password
        );
        if (hashedPasswordMatch) {
          if (user.status == APPROVED_STATUS.PENDING) {
            return res.render("login", {
              message: "Your approve request is pending by admin.",
              email: request.email,
            });
          }
          if (user.status == APPROVED_STATUS.REJECTED) {
            return res.render("login", {
              message: "Your account is rejected by admin.",
              email: request.email,
            });
          }
          const payload = {
            user: user,
          };
          await jwt.sign(
            payload,
            JWT.SECRET,
            { expiresIn: JWT.EXPIRES_IN },
            async (err, token) => {
              if (err) {
                return res.render("errors/500");
              } else {
                req.session.token = token;
                req.session.userid = user.id;
                req.session.role = user.type;
                req.user = user;
                await commonService.createOne(AccessToken, {
                  userId: user.id,
                  token: token,
                });
                return res.redirect("/dashboard");
              }
              req.session.token = token;
              return res.redirect("/");
            }
          );
        } else {
          return res.render("login", {
            message: "Email or Password is incorrect.",
            email: request.email,
          });
          return res.redirect("back");
          return res.redirect("/login");
          return res.render("login", {
            message: "Email or Password is incorrect.",
            data: request,
          });
        }
      } else {
        // return res.redirect("/login");
        return res.render("login", {
          message: "Email or Password is incorrect.",
          data: request,
        });
      }
    } catch (err) {
      console.log(err);
      return res.render("errors/500");
    }
  }

  /**
   * User logout
   * @param Request req
   * @param Response res
   */
  static async logout(req, res, next) {
    delete req.session.token;
    delete req.session.userid;
    delete req.session.role;
    return res.redirect("/");
  }

  /**
   * User userInfo
   * @param Request req
   * @param Response res
   */
  static async userInfo(req, res, next) {
    const userInfo = await commonService.findOne(
      User,
      { id: req.session.userid },
      { raw: false, plain: true }
    );
    var data = new UserResource(userInfo);
    const subscriptionInfo = await commonService.findOne(
      Subscription,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    const notificationCount = await Notification.count({
      where: {
        userId: req.session.userid,
        readAt: null,
      },
    });
    data.is_premium = 0;
    data.notification_count = notificationCount;
    if (typeof subscriptionInfo != "undefined" && subscriptionInfo) {
      var mysqlTimestamp = moment(Date.now()).unix();
      var dbDate = moment(subscriptionInfo.expiry_date).unix();
      if (dbDate > mysqlTimestamp) {
       data.is_premium = 1;
      }
    }

    return res.end(JSON.stringify(data));
    return userInfo;
  }

  static async checkTokenValid(token) {
    if (!token) {
      return false;
    } else {
      try {
        const tokenVerify = await jwt.verify(
          token,
          JWT.SECRET,
          async (error, userData) => {
            if (error) {
              return false;
            } else {
              const email = userData.email;
              const userExist = await commonService.findOne(
                User,
                { email },
                { raw: true }
              );
              if (!(userExist.resetToken === userData.resetToken)) {
                return false;
              }
              return true;
            }
          }
        );
        return tokenVerify;
      } catch (error) {
        return false;
      }
    }
  }

  static async userResetPassowrd(userData) {
    const data = await jwt.verify(
      userData.token,
      JWT.SECRET,
      async (error, data) => {
        if (error) {
          return false;
        } else {
          const email = data.email;
          const userExist = await commonService.findOne(
            User,
            { email },
            { raw: true }
          );
          if (!(userExist.resetToken === data.resetToken)) {
            return false;
          } else {
            await commonService.updateByQuery(
              User,
              { email },
              {
                password: await bcrypt.hash(
                  userData.password,
                  BCRYPT.SALT_ROUND
                ),
                resetToken: null,
              }
            );
            return true;
          }
        }
      }
    );
    return data;
  }
}
export default AuthController;
