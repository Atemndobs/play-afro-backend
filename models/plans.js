import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let Plans = sequelize.define("plans", {
  plan_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plan_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  method: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: "1=>stripe,2=>paypal",
  }
});

sequelizeTransforms(Plans);
export default Plans;
