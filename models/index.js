/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

import dbConnection from "../src/common/config/database";

//models
import AccessToken from "./accessToken";
import RefreshToken from "./refreshToken";
import Country from "./country";
import Djcomapny from "./djCompany";
import Music from "./music";
import Card from "./card";
import users from "./users";
import admin from "./admin";
import appVersion from "./appVersions";
import MusicDownloadQuestions from "./music-download-question";
import MusicReviews from "./music-review";
import MusicRankLogs from "./music-rank-logs";
import Notification from "./notification";
import Plans from "./plans";
import Subscription from "./subscription";
import MusicQuestions from "./music-question";

const db = {};
db.sequelize = dbConnection;

users.hasOne(Country, {
  sourceKey: "country",
  as: "country_data",
  foreignKey: "id",
});
// Subscription.hasOne(Plans, { foreignKey: "plan_id", as: "plan_data" });
Subscription.belongsTo(users, {
  sourceKey: "id",
  as: "user_data",
  foreignKey: "userId",
});

Country.belongsTo(users, {
  sourceKey: "id",
  as: "user_data",
  foreignKey: "country",
});

Djcomapny.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(Djcomapny, {
  foreignKey: "userId",
  sourceKey: "id",
});

Music.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(Music, {
  foreignKey: "userId",
  sourceKey: "id",
});

Card.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(Card, {
  foreignKey: "userId",
  sourceKey: "id",
});

MusicReviews.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(MusicReviews, {
  foreignKey: "userId",
  sourceKey: "id",
});

MusicReviews.belongsTo(Music, {
  foreignKey: "musicId",
  as: "music",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(MusicReviews, {
  foreignKey: "musicId",
  sourceKey: "id",
});

MusicDownloadQuestions.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(MusicDownloadQuestions, {
  foreignKey: "userId",
  sourceKey: "id",
});

MusicDownloadQuestions.belongsTo(Music, {
  foreignKey: "musicId",
  as: "music",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(MusicDownloadQuestions, {
  foreignKey: "musicId",
  sourceKey: "id",
});

MusicDownloadQuestions.belongsTo(MusicReviews, {
  foreignKey: "reviewId",
  as: "musicDownload",
  targetKey: "id",
  onDelete: "CASCADE",
});

MusicReviews.hasMany(MusicDownloadQuestions, {
  foreignKey: "reviewId",
  sourceKey: "id",
});

Notification.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
  targetKey: "id",
  onDelete: "CASCADE",
});

users.hasMany(Notification, {
  foreignKey: "userId",
  sourceKey: "id",
});

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("Yes re-sync");
});
module.exports = db;
