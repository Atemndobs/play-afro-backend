/**
* app-versions.js
* @description :: sequelize model of database table app_versions
*/

import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";

let AppVersions = sequelize.define('app_versions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  minVersion: { type: DataTypes.STRING },
  latestVersion: { type: DataTypes.STRING },
  appLink: { type: DataTypes.STRING },
  platform: { type: DataTypes.STRING },
  role: { type: DataTypes.INTEGER }
});

AppVersions.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};

sequelizeTransforms(AppVersions);
export default AppVersions
