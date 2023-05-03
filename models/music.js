/**
 * user.js
 * @description :: sequelize model of database table user
 */

import sequelizePaginate from "sequelize-paginate";
import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import bcrypt from "bcryptjs";
import { DataTypes } from "sequelize";
import { BCRYPT } from "../src/common/constants/constant";
import { baseUrl } from "../src/common/constants/config-constant";

let Music = sequelize.define("musics", {
  userId: { type: DataTypes.INTEGER },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  music: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featuring: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  song_type: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  bpm: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cover_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publish_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  release_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  spotify_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apple_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amazon_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_paid: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false,
  },
  views: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  download: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  position: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  plays: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  score: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  prev_position: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  top_rank: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  week_pos: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  l_week_pos: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
    allowNull: false,
  },
  is_approved: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(Music);
export default Music;
