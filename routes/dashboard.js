import express from "express";
import authenticateWeb from "../common/middleware/authenticate-web";
import AuthController from "../controllers/AuthController";
import DashboardController from "../controllers/DashboardController";
import StripeHandlerController from "../controllers/StripeHandlerController.js";
import PaypalHandlerController from "../controllers/PaypalHandlerController.js";
import multer from "multer";
import storeFiles from "../common/middleware/storeFile";
import storeDiffFiles from "../common/middleware/storeDiffFiles";
import asyncWrap from "express-async-wrapper";

// different file uploads
// var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "media/music");
  },
  filename: function (req, file, callback) {
    if (file.originalname.length > 6)
      callback(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          file.originalname.substr(
            file.originalname.length - 6,
            file.originalname.length
          )
      );
    else callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
// different file uploads ended
const router = express.Router();

router.get("/userinfo", authenticateWeb, AuthController.userInfo);
router.get("/logout", authenticateWeb, AuthController.logout);
router.get("/dashboard", authenticateWeb, DashboardController.artistDashboard);
router.get("/stats", authenticateWeb, DashboardController.stats);
router.post("/dashboard", authenticateWeb, DashboardController.artistDashboard);
router.get("/trends", authenticateWeb, DashboardController.djDashboard);
router.post("/trends", authenticateWeb, DashboardController.djDashboard);
router.get("/subscription", authenticateWeb, DashboardController.subscription);
router.get(
  "/in-review",
  authenticateWeb,
  DashboardController.inReviewMusicList
);
router.get("/music",authenticateWeb, asyncWrap(DashboardController.musicDetail));
router.post("/music", asyncWrap(DashboardController.searchMusicDetail));
router.post(
  "/subscription",
  authenticateWeb,
  asyncWrap(StripeHandlerController.subscription)
);
router.get("/payment/:id", authenticateWeb, DashboardController.payment);
// router.get("/music", asyncWrap(DashboardController.musicDetail));
router.post("/stripe-webhook", asyncWrap(StripeHandlerController.webhook));
router.get("/notification", authenticateWeb, (req, res) => {
  return res.render("artist-company/notification");
});
router.get(
  "/dj-notification",
  authenticateWeb,
  asyncWrap(DashboardController.getDjNotification)
);
router.post(
  "/music/download-question",
  DashboardController.submitMusicDownloadQuestions
);
router.get("/upload-music", authenticateWeb, DashboardController.uploadMusic);
router.post(
  "/music-payment",
  authenticateWeb,
  asyncWrap(StripeHandlerController.musicPayment)
);
router.post(
  "/upload-music",
  authenticateWeb,
  upload.fields([
    {
      name: "audio_file",
      maxCount: 1,
    },
    {
      name: "cover_photo",
      maxCount: 1,
    },
  ]),
  DashboardController.postMusic
);
router.get("/", DashboardController.dashboard);
router.get("/cron", DashboardController.musicCron);
router.get("/test", StripeHandlerController.createNewCustomer);

//Paypal Payment Gateway


router.get("/pay", PaypalHandlerController.pay);
router.get("/success", PaypalHandlerController.sucess);
router.get("/cancel", PaypalHandlerController.cancel);

//paypal subscriptions

router.get("/create-plan", PaypalHandlerController.createPLan);
router.get("/activate-plan", PaypalHandlerController.activatePLan);
router.get("/purchase-plan", PaypalHandlerController.purchaseSubscription);
router.get("/paypal-success",PaypalHandlerController.subscribed);
router.get("/paypal-failed", PaypalHandlerController.failed);
router.get("/paypal-create-product", PaypalHandlerController.createProduct);
router.get(
  "/paypal-create-product-plan",
  PaypalHandlerController.createProductPlan
);



module.exports = router;
