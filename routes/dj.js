import express from "express";
import DjController from "../controllers/DjController.js";
import StripeHandlerController from "../controllers/StripeHandlerController.js";
import AuthController from "../controllers/AuthController";
import authenticateWeb from "../common/middleware/authenticate-web";
import storeFiles from "../common/middleware/storeFile";
const asyncHandler = require("express-async-handler");
const router = express.Router();

router.get("/register", DjController.register);

router.post(
  "/music/download",
  authenticateWeb,
  asyncHandler(DjController.musicDownload)
);

router.post(
  "/music/review",
  authenticateWeb,
  asyncHandler(DjController.musicReview)
);

router.post(
  "/music/counter",
  authenticateWeb,
  asyncHandler(DjController.counterIncrease)
);

router.get("/music/review", asyncHandler(DjController.getMusicReviews));

router.get("/customer-create", StripeHandlerController.createNewCustomer);
router.get("/edit-perosnal-detail", authenticateWeb, DjController.editInfo);
router.get("/music-detail/:id", authenticateWeb, DjController.musicdetail);
router.get("/edit-company-detail", authenticateWeb, DjController.editCompany);
router.post(
  "/edit-company-detail",
  authenticateWeb,
  DjController.updateCompany
);
router.post(
  "/edit-perosnal-detail",
  authenticateWeb,
  storeFiles("media/users", "profileImage"),
  DjController.updateInfo
);
router.get("/add-card", StripeHandlerController.addCard);
router.get("/charge", StripeHandlerController.chargeCreate);
router.get("/test-account", StripeHandlerController.validateBank);
router.post("/register", DjController.addDj);
router.get("/logout", authenticateWeb, AuthController.logout);

module.exports = router;
