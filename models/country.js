/**
 * country.js
 * @description :: sequelize model of database table user
 */

import sequelizePaginate from "sequelize-paginate";
import sequelizeTransforms from "sequelize-transforms";

import sequelize from "../src/common/config/database";
import { DataTypes } from "sequelize";

const Country = sequelize.define('country', {
    // Model attributes are defined here
    iso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nicename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iso3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numcode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phonecode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    }
}, {
    // Other model options go here
});
sequelizeTransforms(Country);
// sequelizePaginate.paginate(Country);
export default Country;