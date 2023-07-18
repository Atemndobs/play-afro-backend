import path from "path";
import "../crons/index";
import DashboardRoutes from "../routes/dashboard";
import DjRoutes from "../routes/dj";
import ProfileRoutes from "../routes/profileRoutes";
import AuthController from "../controllers/AuthController";
import AdminRoutes from "../routes/admin";
import session from "express-session";
import userRoutes from "../routes/userRoutes";
import flutterWaveRoutes from "../routes/flutterWaveRoutes"
import handleError from "./common/middleware/error";
import fs from "fs";
var moment = require("moment");

const express = require("express");
const app = express();
app.locals.moment = require("moment");
// app.use(
//   express.session({
//     secret: "djchart12334",
//     store: new MemoryStore(),
//     expires: new Date(Date.now() + 2 * 86400 * 1000), //(2days)
//   })
// );
// const router = express.Router();
app.disable("view cache");
//template engine
app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}../../src`, "views"));
app.use("/media", express.static(path.join(__dirname, "../media")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use session
app.use(
  session({ secret: "hjs89d", resave: "false", saveUninitialized: "true" })
);

//asset url
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/dj/", express.static(path.join(__dirname, "../public")));

// app.use("/dj/music-detail/", express.static(path.join(__dirname, "../../public")));
// const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
require("../models/");

app.use("/", DashboardRoutes);
app.use("/", ProfileRoutes);
app.use("/", AdminRoutes);
app.use("/dj", DjRoutes);
app.use("/user", userRoutes);
//============= FLUTTER WAVE =======
app.use("/flutter-wave", flutterWaveRoutes)

app.use(handleError);
import DashboardController from "../controllers/DashboardController";
const isSecure = process.env.isSSLEnable === "true";
const port = isSecure ? process.env.PORT_HTTPS : process.env.PORT;

if (isSecure) {
  var options = {
    key: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`),
    cert: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
    ca: [
      fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
      fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`),
    ],
  };
  var https = require("https").Server(options, app);

  https.listen(port, () => {
    console.log(`Https server is running on ${process.env.BASE_URL}`);
  });
} else {
  app.listen(port, () => {
    console.log(`Listing on  ${process.env.BASE_URL}`);
  });
}

// http.listen(PORT, () => {
//   console.log(`Listing on port ${PORT}`);
// });
app.locals.url = function (path) {
  if (process.env.ENV !== "production") {
    return `${process.env.APP_ASSET_URL}` + path;
  }
  return `${process.env.APP_ASSET_URL}` + path;
};
app.get("/login", (req, res) => {
  return res.render("login");
  return DashboardController.dashboard(req, res);
});
app.post("/post-login", (req, res) => {
  return AuthController.login(req, res);
});
app.get("/register", (req, res) => {
  return AuthController.register(req, res);
  console.log("test");
});

app.post("/post-register", (req, res) => {
  return AuthController.postRegister(req, res);
  console.log("test");
});
