import express from "express";
import authenticateWeb from "../common/middleware/authenticate-web";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import asyncWrap from "express-async-wrapper";
import storeFiles from "../common/middleware/storeFile";
import DashboardController from "../controllers/DashboardController";
const router = express.Router();


router.get("/profile", authenticateWeb, UserController.profile);
router.post(
  "/update-profile",authenticateWeb,
  storeFiles("media/users", "profileImage"),
  asyncWrap(UserController.updateProfile)
);

router.post(
  "/update-password",
  authenticateWeb,
  asyncWrap(UserController.updatePassword)
);

router.get(
  "/update-password",
  authenticateWeb,
  asyncWrap(UserController.getUpdatePasswordPage)
);
// router.post("/update-profile", authenticateWeb, UserController.updateProfile);



module.exports = router;