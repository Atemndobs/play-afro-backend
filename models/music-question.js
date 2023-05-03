import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let MusicQuestions = sequelize.define("music_questions", {
  question: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(MusicQuestions);
export default MusicQuestions;
