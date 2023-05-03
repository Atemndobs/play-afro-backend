import admin from "firebase-admin";
var serviceAccount = require("../../firebase-adminsdk.json");

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
