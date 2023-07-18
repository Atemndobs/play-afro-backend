import jwt from "jsonwebtoken";
import {
  APPROVED_STATUS,
  JWT,
  NOTIFICATION_TYPE,
  ROLE,
  USER_TYPE,
} from "../common/constants/constant";
import { Buffer } from "buffer";
import Music from "../models/music";
import Card from "../models/card";
import MusicRankLogs from "../models/music-rank-logs";
import commonService from "../utils/commonService";
import { badRequest } from "../utils/response/responseCode";
import Notification from "../models/notification";
import User from "../models/users";
import Subscription from "../models/subscription";
import { Op, Sequelize } from "sequelize";
import Plan from "../models/plans";
import moment from "moment";
import MusicReviews from "../models/music-review";
import sequelize from "sequelize";
class DashboardController {
  /**
   * dashboard
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async dashboard(req, res, next) {
    // var token='eyJ2ZXJzaW9uIjoiMS4wIiwicGFja2FnZU5hbWUiOiJjb20uZmluYW5jaWVsbGUubW9iaWxlLmFwcCIsImV2ZW50VGltZU1pbGxpcyI6IjE2NzUwNjA5NDMzNTQiLCJzdWJzY3JpcHRpb25Ob3RpZmljYXRpb24iOnsidmVyc2lvbiI6IjEuMCIsIm5vdGlmaWNhdGlvblR5cGUiOjMsInB1cmNoYXNlVG9rZW4iOiJvamxwZmxlbmlubWFhY2hub2FlY2FwamwuQU8tSjFPeWxBTVhxb2hRUUk3ZGMxQVZ0Q3FaNDF5d0NqclVLR2JMMzFOVjlDR015VGhCdGlkSXVDMFZMdzd2RGZCOFd3UVBNWWRJVHh5d21wZzhCaWt0NWFyZEtIX25CQ19PWWQ1eEN2Q0F1bUJrYXdmR0cyZUEiLCJzdWJzY3JpcHRpb25JZCI6ImNvbS5maW5hbmNpZWxsZS5tb2JpbGUuYXBwLnN1YnNjcmlwdGlvbi5tb3RobHkxIn19';
    // var base64Payload = token;
    // var payloadBuffer = Buffer.from(base64Payload, "base64");
    // console.log(JSON.parse(payloadBuffer.toString()));

    const musicList = await commonService.findAllRecords(
      Music,
      {
        is_approved: APPROVED_STATUS.ACCEPT,
      },
      {
        order: [["position", "ASC"]],
      }
    );

    return res.render("dashboard", { data: musicList });
    res.send({ message: "success" });
  }

  /**
   * subscription
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async subscription(req, res, next) {
    const subscriptionInfo = await commonService.findOne(
      Subscription,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    var isPremium = 0;
    if (typeof subscriptionInfo != "undefined" && subscriptionInfo) {
      var mysqlTimestamp = moment(Date.now()).unix();
      var dbDate = moment(subscriptionInfo.expiry_date).unix();
      console.log(isPremium, mysqlTimestamp, dbDate);
      if (dbDate > mysqlTimestamp) {
        isPremium = 1;
      }
    }
    return res.render("artist-company/subscription", {
      subscriptionInfo: subscriptionInfo,
      isPremium: isPremium,
      moment: moment,
    });
  }

  /**
   * payment
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async payment(req, res, next) {
    var id = req.params.id;
    var cardInformation = await commonService.findOne(
      Card,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    var plan = await Plan.findOne({
      where: {
        id: id,
      },
    });
    return res.render("artist-company/payment", {
      plan: plan,
      cardInfo: cardInformation,
    });
  }

  /**
   * dashboard
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async artistDashboard(req, res, next) {
    const search = req.body.search || null;
    var where;
    if (req.session.role >= 0) {
      if (req.session.role == 2) {
        const musicIds = await MusicReviews.findAll({
          where: { userId: req.session.userid },
          attributes: ["musicId"],
          raw: true,
        });
        const musicIdsArray = musicIds.map((review) => review.musicId);
        where = search
          ? {
              id: musicIdsArray,
              is_approved: APPROVED_STATUS.ACCEPT,
              [Op.or]: [
                {
                  title: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  artist: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  label: {
                    [Op.like]: `%${search}%`,
                  },
                },
                ,
              ],
            }
          : {
              id: musicIdsArray,
              is_approved: APPROVED_STATUS.ACCEPT,
            };
      } else {
        where = search
          ? {
              is_approved: APPROVED_STATUS.ACCEPT,
              userId: req.session.userid,
              [Op.or]: [
                {
                  title: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  artist: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  label: {
                    [Op.like]: `%${search}%`,
                  },
                },
                ,
              ],
            }
          : {
              is_approved: APPROVED_STATUS.ACCEPT,
              userId: req.session.userid,
            };
      }

      const musicList = await commonService.findAllRecords(Music, where, {
        order: [["score", "DESC"]],
      });

      return res.render("artist-company/dashboard", {
        current_role: req.session.role,
        data: musicList,
      });
    } else {
      return res.redirect("/");
    }
    res.send({ message: "success" });
  }
  /**
   * djDashboard
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async djDashboard(req, res, next) {
    const search = req.body.search || null;
    var where;
    if (req.session.role >= 0) {
      if (req.session.role == 2) {
        where = search
          ? {
              is_approved: APPROVED_STATUS.ACCEPT,
              [Op.or]: [
                {
                  title: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  artist: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  label: {
                    [Op.like]: `%${search}%`,
                  },
                },
                ,
              ],
            }
          : {
              is_approved: APPROVED_STATUS.ACCEPT,
            };
      } else {
        where = search
          ? {
              is_approved: APPROVED_STATUS.ACCEPT,
              userId: req.session.userid,
              [Op.or]: [
                {
                  title: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  artist: {
                    [Op.like]: `%${search}%`,
                  },
                },
                {
                  label: {
                    [Op.like]: `%${search}%`,
                  },
                },
                ,
              ],
            }
          : {
              is_approved: APPROVED_STATUS.ACCEPT,
              userId: req.session.userid,
            };
      }

      const musicList = await commonService.findAllRecords(Music, where, {
        order: [["score", "DESC"]],
      });

      return res.render("artist-company/trends", {
        current_role: req.session.role,
        data: musicList,
      });
    } else {
      return res.redirect("/");
    }
    res.send({ message: "success" });
  }
  static async stats(req, res) {
    const musicDetail = await commonService.findOne(Music, {
      id: req.query.musicId,
    });
    const Stars5 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 5,
        },
      },
    });
    const Stars4 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 4,
        },
      },
    });
    const Stars3 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 3,
        },
      },
    });
    const Stars2 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 2,
        },
      },
    });
    const Stars1 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 1,
        },
      },
    });
    const Stars0 = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
        star: {
          [Op.eq]: 0,
        },
      },
    });
    const total = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
      },
    });
    var AverageRating = 0;
    const avgRating = await MusicReviews.findOne({
      attributes: [[sequelize.fn("AVG", sequelize.col("star")), "avgStar"]],
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
      },
    });
    if (avgRating != null) {
      AverageRating = avgRating.avgStar == null ? 0 : avgRating.avgStar;
    }
    var ratingData = {
      Stars0: Stars0,
      Stars1: Stars1,
      Stars2: Stars2,
      Stars3: Stars3,
      Stars4: Stars4,
      Stars5: Stars5,
      total: total,
      avg: parseInt(AverageRating),
    };
    return res.render("artist-company/stats", {
      ratingData: ratingData,
      musicDetail: musicDetail,
    });
  }
  /**
   * musicDetail
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async musicDetail(req, res, next) {
    const userId = req.session.userid;
    const role = req.session.role;
    let isDownloadEnable = false;

    if (!req.query.musicId) {
      return res.redirect("/");
    }

    const musicDetail = await commonService.findOne(Music, {
      id: req.query.musicId,
    });
    if (!musicDetail) {
      if (userId) {
        const musicNotification = await commonService.findOne(Notification, {
          userId,
          referenceId: req.query.musicId,
          type: NOTIFICATION_TYPE.MUSIC,
        });
        if (musicNotification && !musicNotification.readAt) {
          await commonService.updateByQuery(
            Notification,
            { id: musicNotification.id },
            { readAt: new Date() }
          );
        }
      }
      return res.redirect("/dashboard");
    }
    const total = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
      },
    });
    const totalStars = await MusicReviews.sum("star", {
      where: {
        musicId: {
          [Op.eq]: req.query.musicId,
        },
      },
    });
    var score = total + totalStars + musicDetail.views + musicDetail.plays;
    if (musicDetail) {
      Music.increment({ views: +1 }, { where: { id: req.query.musicId } });
      await Music.update(
        {
          score: score,
        }, // new position value
        { where: { id: req.query.musicId } }
      );
    }
    if (!musicDetail) {
      return res.redirect("/");
    }

    if (userId) {
      const musicNotification = await commonService.findOne(Notification, {
        userId,
        referenceId: req.query.musicId,
        type: NOTIFICATION_TYPE.MUSIC,
      });
      if (musicNotification && !musicNotification.readAt) {
        await commonService.updateByQuery(
          Notification,
          { id: musicNotification.id },
          { readAt: new Date() }
        );
      }
    }

    if (role == ROLE.DJ) {
      if (userId != musicDetail.userId) {
        isDownloadEnable = true;
      }
    }

    return res.render("music", { music: musicDetail, isDownloadEnable });
  }

  /**
   * Submit music download questions
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async submitMusicDownloadQuestions(req, res) {
    console.log(req.body);

    return;
  }

  /**
   * uploadMusic
   * +
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async uploadMusic(req, res, next) {
    return res.render("artist-company/upload-music");
    res.send({ message: "success" });
  }

  /**
   * Post music
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  static async postMusic(req, res, next) {
    const data = req.body;
    data.userId = req.session.userid;
    if (req.files) {
      Object.keys(req.files).forEach(function (key) {
        var val = req.files[key];
        if (val[0].fieldname == "cover_photo") {
          data.cover_photo = val[0].destination + "/" + val[0].filename;
        } else if (val[0].fieldname == "audio_file") {
          data.music = val[0].destination + "/" + val[0].filename;
        }
      });
    }

    const subscriptionInfo = await commonService.findOne(
      Subscription,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    var isPremium = 0;
    if (typeof subscriptionInfo != "undefined" && subscriptionInfo) {
      var mysqlTimestamp = moment(Date.now()).unix();
      var dbDate = moment(subscriptionInfo.expiry_date).unix();
      if (dbDate > mysqlTimestamp) {
        isPremium = 1;
        data.is_paid = 1;
      }
    }
    data.genre = data.genre.join(",");
    const music = await commonService.createOne(Music, data);
    const cardInfo = await commonService.findOne(
      Card,
      { userId: req.session.userid },
      { raw: false, plain: true }
    );
    return res.render("artist-company/upload-music", {
      cardInfo: cardInfo,
      musicData: music,
      isPremium: isPremium,
    });
  }

  /**
   * Music cron job for ranking
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async musicCron(req, res, next) {
    const musics = await Music.findAll({
      order: [["views", "DESC"]],
    });
    var date = new Date();
    var currentDay = date.toLocaleDateString("UTC", { weekday: "long" });
    let position = 1;
    let lastWeekPos = 0;
    let lastWeekPos2 = 0;
    for (const data of musics) {
      const rankLog = await MusicRankLogs.findAll({
        where: {
          musicId: data.id,
          day: "Friday",
        },
        group: "createdAt",
        order: [["id", "DESC"]],
        limit: 2,
      });
      if (
        typeof rankLog !== "undefined" &&
        rankLog.length > 0 &&
        typeof rankLog[0].position !== "undefined"
      ) {
        lastWeekPos = rankLog[0].position;
      } else {
        lastWeekPos = 0;
      }

      if (
        typeof rankLog !== "undefined" &&
        rankLog.length > 1 &&
        typeof rankLog[1].position !== "undefined"
      ) {
        lastWeekPos2 = rankLog[1].position;
      } else {
        lastWeekPos2 = 0;
      }
      await Music.update(
        {
          position: position,
          week_pos: lastWeekPos,
          l_week_pos: lastWeekPos2,
        }, // new position value
        { where: { id: data.id } } // user ID filter
      );
      const newUser = await MusicRankLogs.create({
        musicId: data.id,
        position: position,
        day: currentDay,
      });
      position++;
    }

    res.send({ message: currentDay });
  }

  /**
   * Get dj notifications
   * @param {*} req
   * @param {*} res
   */
  static async getDjNotification(req, res) {
    const userId = req.session.userid;

    let limit = req.query.itemsPerPage;
    let offset = (req.query.page - 1) * req.query.itemsPerPage;
    const notification = await Notification.findAll({
      where: {
        userId,
        readAt: null,
      },
      // offset: Number(offset),
      // limit: Number(limit),
    });
    return res.send({ data: notification });
  }

  /**
   * In review music list
   * @param {*} req
   * @param {*} res
   */
  static async inReviewMusicList(req, res) {
    const userId = req.session.userid;
    const pendingMusic = await commonService.findAllRecords(Music, {
      userId,
      is_approved: false,
    });
    return res.render("artist-company/in-review", { data: pendingMusic });
  }
}

export default DashboardController;
