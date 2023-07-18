import express from "express";
import FlutterWaveController from "../controllers/FlutterwaveHandlerController";
const router = express.Router();

router.get("/charge", FlutterWaveController.chargeCreate);
router.post("/transfer", FlutterWaveController.transfer);
router.get("/refund/:token", FlutterWaveController.refund);
router.post("/flutter-wave-webhook", FlutterWaveController.webhook);

module.exports = router;
