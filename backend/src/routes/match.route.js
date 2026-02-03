import express from "express";
import { findMatch } from "../controllers/match.controller.js";

const router = express.Router();

router.post("/find", findMatch);

export default router;
