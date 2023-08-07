import express from "express";
import { plandata } from "../controllers/planControllers.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, plandata);

export default router;
