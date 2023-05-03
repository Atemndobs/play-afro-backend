/**
 * Admin.js
 * @description :: sequelize model of database table Admin
 */

import sequelize from "../src/common/config/database";
import sequelizeTransforms from "sequelize-transforms";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { BCRYPT } from "../common/constants/constant";

let Admin = sequelize.define("admin", {
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    hooks:
    {
        beforeCreate: [
            async function (admin, options) {
                if (admin.password) {
                    admin.password =
                        await bcrypt.hash(admin.password, BCRYPT.SALT_ROUND);
                }
            },
        ],
    }
});

Admin.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

Admin.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};

sequelizeTransforms(Admin);
export default Admin;
