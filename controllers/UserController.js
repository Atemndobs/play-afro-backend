import Country from "../models/country";
import authService from "../services/auth.service";
import commonService from "../utils/commonService";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { BCRYPT, JWT } from "../common/constants/constant";
import User from "../models/users";
import bcrypt from "bcryptjs";
import AccessToken from "../models/accessToken";
import UserResource from "../resources/UserResource";
import { baseUrl } from "../common/constants/config-constant";
import crypto from "crypto";
import sendMail from "../src/common/send-mail";
import AuthController from "./AuthController";

class UserController {
  /**
   * User profile
   * @param Request req
   * @param Response res
   */
  static async profile(req, res, next) {
    const userInfo = await commonService.findOne(
      User,
      { id: req.session.userid },
      { raw: false, plain: true }
    );
    const countries = await Country.findAll();
    return res.render("artist-company/profile", {
      userInfo: new UserResource(userInfo),
      countries: countries,
    });
  }

  /**
   * User profile
   * @param Request req
   * @param Response res
   */
  static async updateProfile(req, res, next) {
    const user = await authService.updateUserDetails(
      req.session.userid,
      req.body,
      req.file
    );
    return res.redirect("/profile");
  }

  /**
   * Get forget password page
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getUserForgetPasswordPage(req, res) {
    return res.render("forget-password");
  }

  static async getUpdatePasswordPage(req, res) {
    return res.render("artist-company/change-password");
  }

  static async updatePassword(req, res) {
    const request = req.body;

    const schema = Joi.object().keys({
      password: Joi.string().required().messages({
        "string.empty": "Please enter password.",
      }),
      newPassword: Joi.string().required().messages({
        "string.empty": "Please enter new password.",
      }),
      conNewPassword: Joi.any()
        .equal(Joi.ref("newPassword"))
        .required()
        .options({ messages: { "any.only": "Password does not match" } }),
    });

    const err = await schema.validate(request, {
      abortEarly: false,
    });

    if (err.error) {
      return res.render("artist-company/change-password", {
        error: err.error,
        data: request,
      });
    }

    const user = await commonService.findOne(
      User,
      { id: req.session.userid },
      { raw: true }
    );

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.render("artist-company/change-password", {
        message: "Old password is incorrect.",
        data: request,
      });
    }

    const hashPassword = await bcrypt.hash(
      req.body.newPassword,
      BCRYPT.SALT_ROUND
    );

    await User.update(
      {
        password: hashPassword,
      },
      { where: { id: req.session.userid } }
    );

    return res.redirect("/login");
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async userForgetPassword(req, res) {
    const request = req.body;

    const schema = Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.empty": "Please enter email address.",
        "string.email": "email must be a valid email",
      }),
    });

    const err = await schema.validate(request, {
      abortEarly: false,
    });

    if (err.error) {
      return res.render("forget-password", { error: err.error, data: request });
    }

    const user = await commonService.findOne(
      User,
      { email: request.email },
      { raw: true }
    );

    if (!user) {
      return res.render("forget-password", {
        message: "We can't find a account with that E-Mail.",
        data: request,
      });
    }

    const resetToken = crypto.randomBytes(16).toString("hex");

    const token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        resetToken: resetToken,
      },
      JWT.SECRET,
      {
        expiresIn: 30,
      }
    );

    await commonService.updateByQuery(
      User,
      { email: user.email },
      { resetToken }
    );

    const obj = {
      to: user.email,
      subject: "Forget Password",
      data: { url: baseUrl(`user/reset-password/${token}`) },
    };

    sendMail(obj, "forget-password");

    return res.render("forget-password", {
      data: req.body,
      success: "Reset password link has been sent to your email",
    });
  }

  static async getUserResetPasswordPage(req, res) {
    const resetPass = await AuthController.checkTokenValid(req.params.token);

    return res.render("reset-password", {
      token: req.params.token,
      flag: `${resetPass}`,
    });
  }

  static async userResetPassword(req, res) {
    const resetPass = await AuthController.checkTokenValid(req.params.token);

    const schema = Joi.object().keys({
      password: Joi.string().required().min(8),
      confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .options({ messages: { "any.only": "passwords does not match" } }),
    });

    const err = await schema.validate(req.body, {
      abortEarly: false,
    });

    if (err.error) {
      return res.render("reset-password", {
        flag: `${resetPass}`,
        error: err.error,
        data: req.body,
      });
    }

    const resetInfo = {
      token: req.params.token,
      password: req.body.password,
    };
    const ResetPassword = await AuthController.userResetPassowrd(resetInfo);

    return res.render("reset-password", {
      flag: `${ResetPassword}`,
      success: "Your password has been updated.",
    });
  }
}

export default UserController;
