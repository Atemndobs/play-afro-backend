import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let MusicRankLogs = sequelize.define("music_rank_logs", {
  musicId: { type: DataTypes.INTEGER },
  position: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  score: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(MusicRankLogs);
export default MusicRankLogs;
