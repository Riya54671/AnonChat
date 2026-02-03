import express from "express";
import { verifyGender, getVerificationStatus } from "../controller/genderController.js";

const router = express.Router();

router.post("/verify", verifyGender);

router.get("/status/:deviceId", getVerificationStatus);

export default router;

