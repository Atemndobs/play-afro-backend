import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let MusicReviews = sequelize.define("music_reviews", {
  userId: { type: DataTypes.INTEGER },
  musicId: { type: DataTypes.INTEGER },
  star: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(MusicReviews);
export default MusicReviews;
