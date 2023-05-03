import Music from "../models/music";
import MusicRankLogs from "../models/music-rank-logs";
import MusicReviews from "../models/music-review";
import commonService from "../utils/commonService";
const { Op } = require("sequelize");

export const setMusicDailyRanking = async () => {
  const musics = await Music.findAll({
    where: {
      is_approved: 1,
    },
    order: [["score", "DESC"]],
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
    const musicDetail = await commonService.findOne(Music, {
      id: data.id,
    });
var prev_position = musicDetail.position;
    const totalStars = await MusicReviews.sum("star", {
      where: {
        musicId: {
          [Op.eq]: data.id,
        },
      },
    });
    const total = await MusicReviews.count({
      where: {
        musicId: {
          [Op.eq]: data.id,
        },
      },
    });
    var score = total + totalStars + musicDetail.views + musicDetail.plays;
    var top_rank = musicDetail.top_rank;
    if (top_rank == 0 || top_rank > position){
        top_rank= position;
    }
      await Music.update(
        {
          position: position,
          week_pos: lastWeekPos,
          l_week_pos: lastWeekPos2,
          top_rank: top_rank,
          score: score,
          prev_position: prev_position,
        }, // new position value
        { where: { id: data.id } } // user ID filter
      );
    await MusicRankLogs.create({
      musicId: data.id,
      position: position,
      day: currentDay,
      score:score,
    });
    position++;
  }

  return;
};
