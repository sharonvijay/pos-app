import express from "express";
import { plandata } from "../controllers/planControllers.js";
const router = express.Router();

router.get("/", plandata);

export default router;
