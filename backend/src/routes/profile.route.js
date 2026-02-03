import express from "express";
import { createProfile } from "../controller/profile.controller.js";

const router = express.Router();

router.post("/create", createProfile);

export default router;
