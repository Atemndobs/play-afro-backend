import admin from "firebase-admin";
// var serviceAccount = require("../../firebase-adminsdk.json");
var serviceAccount = require("../../home-yogi-e45fa-firebase-adminsdk-cxr0e-67f4a9d321.json");

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
