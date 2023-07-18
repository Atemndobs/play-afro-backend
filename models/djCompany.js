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

let Djcomapny = sequelize.define("dj_company", {
  userId: { type: DataTypes.INTEGER },
  agency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  booker: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactPerson: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  openingDay: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_instagram_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_facebook_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_twitter_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_tiktok_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  residenceClub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referenceClub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referenceEvent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelizeTransforms(Djcomapny);
export default Djcomapny;
