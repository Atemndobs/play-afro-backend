import express from "express";
import AdminController from "../controllers/AdminController";
import authenticateAdmin from "../common/middleware/authenticate-admin";

const router = express.Router();

router.get("/admin/dashboard",authenticateAdmin, AdminController.dashboard);
router.get("/admin/artist", authenticateAdmin, AdminController.artist);
router.get("/admin/all", authenticateAdmin, AdminController.all);
router.get("/admin/music", authenticateAdmin, AdminController.music);
router.get("/admin/companies", authenticateAdmin, AdminController.company);
router.get("/admin/dj", authenticateAdmin, AdminController.dj);
router.get("/admin/users/:id", authenticateAdmin, AdminController.users);
router.post(
  "/admin/accept-reject",
  authenticateAdmin,
  AdminController.acceptReject
);
router.post(
  "/admin/save-password",
  authenticateAdmin,
  AdminController.updatePassword
);
router.post(
  "/music/accept-reject",
  authenticateAdmin,
  AdminController.musicAcceptReject
);
router.get("/admin/login", AdminController.getLoginPage);
router.get("/admin", AdminController.getLoginPage);
router.post("/admin/login", AdminController.login);
router.get("/admin/logout", authenticateAdmin, AdminController.logout);


module.exports = router;