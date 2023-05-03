import Country from "../models/country";
import authService from "../services/auth.service";
import commonService from "../utils/commonService";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { JWT } from "../common/constants/constant";
import { ROLE } from "../common/constants/constant";
import User from "../models/users";
import { BCRYPT } from "../common/constants/constant";
import Admin from "../models/admin";
import bcrypt from "bcryptjs";
import AccessToken from "../models/accessToken";
import UserResource from "../resources/UserResource";
import Music from "../models/music";
import Notification from "../models/notification";
import { baseUrl } from "../src/common/constants/config-constant";
import dotenv from "dotenv";
dotenv.config();
class AdminController {
  /**
   * dashboard
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async dashboard(req, res, next) {
    var artist,
      music,
      company,
      users,
      dj = 0;
    await User.count({
      where: {
        type: 0,
      },
    }).then((count) => {
      artist = count;
    });
    await User.count().then((count) => {
      users = count;
    });
    await User.count({
      where: {
        type: 1,
      },
    }).then((count) => {
      company = count;
    });
    await User.count({
      where: {
        type: 2,
      },
    }).then((count) => {
      dj = count;
    });
    await Music.count().then((count) => {
      music = count;
    });
    return res.render("admin/dashboard", {
      music: music,
      dj: dj,
      company: company,
      artist: artist,
      users: users,
    });
  }

  /**
   * users
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async users(req, res, next) {
    const info = await User.findOne({ where: { id: req.params.id } });
    if (!info) {
      return res.redirect("admin/artist");
    }
    return res.render("admin/password-update", { userData: info });
  }

  /**
   * acceptReject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async updatePassword(req, res, next) {
    var data = req.body;
    const info = await User.findOne({ where: { id: data.id } });
    await User.update(
      {
        password: await bcrypt.hash(data.password, BCRYPT.SALT_ROUND),
      }, // new position value
      { where: { id: data.id } } // user ID filter
    );
    if (info.type == 0) {
      return res.redirect("admin/artist");
    } else if (info.type == 1) {
      return res.redirect("/admin/companies");
    } else {
      return res.redirect("/admin/dj");
    }

    // return res.send({ success: true });
  }

  /**
   * music
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async music(req, res, next) {
    const countries = await Country.findAll();
    const musics = await Music.findAll({
      include: [{ model: User, as: "user" }],
      raw: true,
      nest: true,
    });
    return res.render("admin/music", {
      musics: musics,
      countries: countries,
    });
  }

  /**
   * artist
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async all(req, res, next) {
    const countries = await Country.findAll();
    const users = await User.findAll({
      include: [
        {
          model: Country,
          as: "country_data",
        },
      ],
      raw: true,
      nest: true,
    });
    return res.render("admin/users", {
      users: users,
      countries: countries,
    });
  }

  /**
   * artist
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async artist(req, res, next) {
    const countries = await Country.findAll();
    const users = await User.findAll({
      where: {
        type: ROLE.ARTIST,
      },
      include: [
        {
          model: Country,
          as: "country_data",
        },
      ],
      raw: true,
      nest: true,
    });
    return res.render("admin/artist", {
      artists: users,
      countries: countries,
    });
  }

  /**
   * company
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async company(req, res, next) {
    const countries = await Country.findAll();
    const users = await User.findAll({
      where: {
        type: ROLE.COMPANY,
      },
      include: [
        {
          model: Country,
          as: "country_data",
        },
      ],
      raw: true,
      nest: true,
    });
    return res.render("admin/company", {
      artists: users,
      countries: countries,
    });
  }

  /**
   * dj
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async dj(req, res, next) {
    const countries = await Country.findAll();
    const users = await User.findAll({
      where: {
        type: ROLE.DJ,
      },
      include: [
        {
          model: Country,
          as: "country_data",
        },
      ],
      raw: true,
      nest: true,
    });
    return res.render("admin/dj", {
      artists: users,
      countries: countries,
    });
  }

  /**
   * acceptReject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async acceptReject(req, res, next) {
    if (req.body.status == 1) {
      const updatedRows = await User.update(
        {
          status: 1,
        },
        {
          where: { id: req.body.id },
        }
      );
    } else if (req.body.status == 2) {
      const updatedRows = await User.destroy({ where: { id: req.body.id } });
    } else if (req.body.status == 3) {
      const updatedRows = await User.destroy({ where: { id: req.body.id } });
    }
    return res.send({ success: true });
  }

  /**
   * acceptReject
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async musicAcceptReject(req, res, next) {
    const getMusic = await commonService.findOne(Music, { id: req.body.id });

    if (req.body.status == 1) {
      const updatedRows = await Music.update(
        {
          is_approved: 1,
        },
        {
          where: { id: req.body.id },
        }
      );
      const djs = await User.findAll({ type: 2 });
      const body = `Hey, check out this newly published song - ${getMusic.title}`;
      await Promise.all(
        djs.map((dj) =>
          commonService.createOne(Notification, {
            userId: dj.id,
            message: body,
            type: 2,
            referenceId: getMusic.id,
          })
        )
      );
      await commonService.createOne(Notification, {
        userId: getMusic.userId,
        message: `Hey, your uploaded song is approved! - ${getMusic.title}`,
        type: 2,
        referenceId: getMusic.id,
      });
    } else if (req.body.status == 3) {
      const updatedRows = await Music.destroy({ where: { id: req.body.id } });
    } else if (req.body.status == 2) {
      const updatedRows = await Music.destroy({ where: { id: req.body.id } });
      const body = `Hey, your uploaded song is rejected! - ${getMusic.title}`;
      await commonService.createOne(Notification, {
        userId: getMusic.userId,
        message: body,
        type: 2,
        referenceId: getMusic.id,
      });
      await Music.destroy({ where: { id: req.body.id } });
    }
    return res.send({ success: true });
  }

  /**
   * Get login page
   * @param {*} req
   * @param {*} res
   */
  static async getLoginPage(req, res) {
    try {
      if (req.session.admintoken) {
        jwt.verify(req.session.admintoken, JWT.SECRET, function (err, decoded) {
          if (err) {
            return res.render("admin/login");
          } else {
            return res.redirect("dashboard");
          }
        });
      } else {
        return res.render("admin/login");
      }
    } catch (err) {
      return res.render("admin/login");
    }
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
        return res.render("admin/login", { error: err.error, data: request });
      }

      const user = await commonService.findOne(
        Admin,
        { email: request.email },
        { raw: false, plain: true }
      );

      if (user) {
        const hashedPasswordMatch = await user.isPasswordMatch(
          request.password
        );

        if (hashedPasswordMatch) {
          const payload = {
            user: user,
          };
          await jwt.sign(
            payload,
            JWT.SECRET,
            { expiresIn: JWT.EXPIRES_IN },
            (err, token) => {
              if (err) {
                console.log(err);
                return res.render("errors/500");
              }
              req.session.admintoken = token;
              return res.redirect("/admin/dashboard");
            }
          );
        } else {
          return res.render("admin/login", {
            message: "Email or Password is incorrect.",
            data: request,
          });
        }
      } else {
        return res.render("admin/login", {
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
    delete req.session.admintoken;
    return res.redirect("/admin");
  }
}

export default AdminController;
