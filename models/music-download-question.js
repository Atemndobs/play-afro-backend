import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let MusicDownloadQuestions = sequelize.define("music_download_questions", {
  userId: { type: DataTypes.INTEGER },
  musicId: { type: DataTypes.INTEGER },
  questionId: { type: DataTypes.INTEGER },
  reviewId: { type: DataTypes.INTEGER },
  answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(MusicDownloadQuestions);
export default MusicDownloadQuestions;
