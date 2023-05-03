import express from "express";
import authenticateWeb from "../common/middleware/authenticate-web";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import asyncWrap from "express-async-wrapper";
import storeFiles from "../common/middleware/storeFile";
import DashboardController from "../controllers/DashboardController";
const router = express.Router();

router.get("/forget-password", UserController.getUserForgetPasswordPage);
router.post("/forget-password", UserController.userForgetPassword);
router.get("/reset-password/:token", UserController.getUserResetPasswordPage);
router.post("/reset-password/:token", UserController.userResetPassword);

router.post(
  "/update-profile",
  authenticateWeb,
  storeFiles("media/users", "profileImage"),
  asyncWrap(UserController.updateProfile)
);

module.exports = router;
