import express from "express";
import protect from "../middleware/authMiddleware.js";
import { payment } from "../controllers/paymentControllers.js";
const router = express.Router();

router.post("/", protect, payment);

export default router;
