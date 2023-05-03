import AppVersions from "../models/appVersions";
import versionData from "./app-versions"
import adminData from "./admin"
import Admin from "../models/admin";

module.exports.seeder = async () => {
  
  const appversions = await AppVersions.findAll({});
  if (appversions.length === 0) {
    AppVersions.bulkCreate(versionData).then(() =>
      console.log("app version data has been saved")
    );
  }
  const admins = await Admin.findAll({});
  if (admins.length === 0) {
    Admin.create(adminData).then(() =>
      console.log("admin data has been saved")
    );
  }
};