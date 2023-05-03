import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import sequelizePaginate from "sequelize-paginate";
import { DataTypes } from "sequelize";

let Notification = sequelize.define("notification", {
  userId: { type: DataTypes.INTEGER },
  type: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  referenceId: { type: DataTypes.INTEGER },
});

sequelizeTransforms(Notification);
sequelizePaginate.paginate(Notification);
export default Notification;
