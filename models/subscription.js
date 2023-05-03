import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let Subscription = sequelize.define("subscriptions", {
  userId: { type: DataTypes.INTEGER },
  plan_id: { type: DataTypes.INTEGER },
  subscription_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  method: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: "1=>stripe,2=>paypal",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ACTIVE",
    comment: "ACTIVE,CANCELLED,FAILED",
  },
});

sequelizeTransforms(Subscription);
export default Subscription;
