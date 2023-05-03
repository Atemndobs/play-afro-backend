/**
 * country.js
 * @description :: sequelize model of database table user
 */

import sequelizePaginate from "sequelize-paginate";
import sequelizeTransforms from "sequelize-transforms";

import sequelize from "../src/common/config/database";
import { DataTypes } from "sequelize";

const Card = sequelize.define(
  "cards",
  {
    // Model attributes are defined here
    userId: { type: DataTypes.INTEGER },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiry_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    last4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
sequelizeTransforms(Card);
// sequelizePaginate.paginate(Card);
export default Card;
