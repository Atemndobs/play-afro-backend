import Country from "../models/country";
import Djcomapny from "../models/djCompany";
import User from "../models/users";
import commonService from "../utils/commonService";
import authService from "../services/auth.service";
import MusicDownloadQuestions from "../models/music-download-question";
import MusicReviews from "../models/music-review";
import { BadRequestException } from "../src/error-exception";
import sequelize, { Sequelize } from "sequelize";
import Music from "../models/music";

const moment = require("moment");

class DjController {
  /**
   * register
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async register(req, res, next) {
    let countries = await Country.findAll();
    return res.render("dj-register", { countries: countries });
  }

  static async addDj(req, res) {
    if (req.query.type == 1) {
      const data = req.body;
      data.fullname = data.firstname + " " + data.surname;
      data.type = 2;
      data.charts = data.charts.toString();
      data.pools = data.pools.toString();
      data.music = data.music.toString();

      const dj = await commonService.createOne(User, req.body);

      return res.send({ djId: dj.id });
    } else {
      const data = req.body;
      // data.agency = data.agency.toString();
      data.userId = req.query.djId;
      // data.openingDay = data.companyday.toString();
      const referenceEvent = data.referenceEvent;
      const residenceClub = data.residenceClub;
      const referenceClub = data.referenceClub;

      data.residenceClub =
        residenceClub && residenceClub.length > 0
          ? data.residenceClub.toString()
          : null;
      data.referenceClub =
        referenceClub && referenceClub.length > 0
          ? data.referenceClub.toString()
          : null;
      data.referenceEvent =
        referenceEvent && referenceEvent.length > 0
          ? data.referenceEvent.toString()
          : null;

      await commonService.createOne(Djcomapny, req.body);
      return res.send({ message: "done" });
    }
  }

  /**
   * editInfo
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async editInfo(req, res, next) {
    let countries = await Country.findAll();
    const userInfo = await commonService.findOne(
      User,
      { id: req.session.userid },
      { raw: false, plain: true }
    );
    var myDate = new Date(userInfo.birthDay);
    userInfo.birthDay = moment(Date.parse(myDate)).format("YYYY-MM-DD");
    var dob = moment(Date.parse(myDate)).format("YYYY-MM-DD");
    return res.render("dj-personal-info", {
      countries: countries,
      userData: userInfo,
      dob: dob,
    });
  }

  /**
   * editCompany
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async editCompany(req, res, next) {
    let countries = await Country.findAll();
    const userInfo = await commonService.findOne(
      Djcomapny,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    return res.render("dj-company-info", {
      countries: countries,
      userData: userInfo,
    });
  }

  static async updateCompany(req, res, next) {
    const data = req.body;
    data.agency = data.agency.toString();
    data.userId = req.session.userid;
    data.openingDay = data.companyday.toString();
    const userInfo = await commonService.findOne(
      Djcomapny,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    const updatedUser = await commonService.updateByPk(
      Djcomapny,
      userInfo.id,
      req.body
    );
    return res.redirect("/dj/edit-company-detail");
    return res.send({ message: "done" });
  }
  /**
   * updateInfo
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async updateInfo(req, res, next) {
    console.log(req.file);
    // return true;
    const data = req.body;
    data.fullname = data.firstname + " " + data.surname;
    data.type = 2;
    data.charts = data.charts.toString();
    data.pools = data.pools.toString();
    data.music = data.music.toString();
    const user = await authService.updateUserDetails(
      req.session.userid,
      req.body,
      req.file
    );
    return res.redirect("/dj/edit-perosnal-detail");
    return res.send({ message: "done" });
  }

  static async musicdetail(req, res, next) {
    console.log("id strings", req.params["id"]);

    return res.render("music-detail");
    return res.redirect("/dj/music-detail");
  }

  /**
   * Musicplay count increase
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async counterIncrease(req, res) {
    const musicId = req.body.musicId;
    await Music.update(
      {
        download: Sequelize.literal("plays + 1"),
      },
      {
        where: { id: musicId },
      }
    );
    return res.send({ message: "Play count Added successfully." });
  }

  /**
   * Music download add review and answers
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async musicDownload(req, res) {
    const data = req.body;
    const musicId = req.body.musicId;
    const reviewId = req.body.reviewId;
    delete data.musicId;
    delete data.reviewId;

    const answerArray = Object.values(data);

    const alreadyAnswerExist = await commonService.findOne(
      MusicDownloadQuestions,
      {
        reviewId,
        userId: req.session.userid,
      }
    );

    if (!alreadyAnswerExist) {
      answerArray.map(async (value, index) => {
        if (value) {
          await commonService.createOne(MusicDownloadQuestions, {
            questionId: index + 1,
            musicId,
            userId: req.session.userid,
            answer: value.toString(),
            reviewId,
          });
        }
      });
    }

    return res.redirect(`/music?musicId=${musicId}`);
    // if (!reviewAlreadyExist) {
    //   await MusicReviews.create({
    //     musicId,
    //     userId: req.session.userid,
    //     star: req.body.star,
    //     review: req.body.review,
    //   })
    //     .then((res) => {
    //       reviewId = res.id;
    // answerArray.map(async (value, index) => {
    //   await commonService.createOne(MusicDownloadQuestions, {
    //     questionId: index + 1,
    //     musicId,
    //     userId: req.session.userid,
    //     answer: value,
    //     reviewId,
    //   });
    // });
    //     })
    //     .catch((err) => {
    //       throw new BadRequestException("Internal server error.");
    //     });
    // }
    // await Music.update(
    //   {
    //     download: Sequelize.literal("download + 1"),
    //   },
    //   {
    //     where: { id: musicId },
    //   }
    // );
    // return res.send({ message: "Review Added successfully." });
  }

  static async musicReview(req, res) {
    const data = req.body;
    const musicId = req.body.musicId;
    delete data.musicId;

    let reviewId;

    const reviewAlreadyExist = await commonService.findOne(MusicReviews, {
      musicId,
      userId: req.session.userid,
    });

    if (!reviewAlreadyExist) {
      const review = await MusicReviews.create({
        musicId,
        userId: req.session.userid,
        star: req.body.star,
        review: req.body.review,
      });

      reviewId = review.id;
    } else {
      reviewId = reviewAlreadyExist.id;
    }

    return res.send({ reviewId });
  }

  /**
   * Get music review list
   * @param {*} req
   * @param {*} res
   */
  static async getMusicReviews(req, res) {
    const musicId = req.query.musicId;
    const userId= req.session.userid;

    const musicReview = await MusicReviews.findAll({
      where: { musicId, userId },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
      raw: true,
      nest: true,
    });

    const avgRating = await MusicReviews.findOne({
      where: { musicId },
      attributes: [[sequelize.fn("AVG", sequelize.col("star")), "avgRating"]],
    });

    const newMusicReview = await Promise.all(
      musicReview.map(async (value) => {
        const answer = await MusicDownloadQuestions.findAll({
          where: { reviewId: value.id },
        });

        return {
          ...value,
          downloadQuestions: answer,
          avgRating: avgRating.avgRating,
        };
      })
    );

    return res.send({ data: newMusicReview });
  }
}
export default DjController;
