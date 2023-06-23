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

let User = sequelize.define(
  "user",
  {
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companywebsite: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactperson: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0=>artist,1=>company,2=>dj",
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      comment: "0=>pending,1=>accepted,2=>rejected",
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDay: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    charts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pools: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    music: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tiktok_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeUpdate: [
        async function (user, options) {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
          }
        },
      ],
      beforeCreate: [
        async function (user, options) {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, BCRYPT.SALT_ROUND);
          }
        },
      ],
    },
  }
);

User.prototype.isPasswordMatch = async function (password) {
  const user = this;
  const check = await bcrypt.compare(password, user.password);
  return check;
};

User.prototype.toJSON = function () {
  return {
    userId: this.id,
    fullname: this.fullname,
    copmanyname: this.copmanyname,
    email: this.email,
    bio: this.bio,
    address: this.address,
  };
};

sequelizeTransforms(User);
sequelizePaginate.paginate(User);
export default User;
