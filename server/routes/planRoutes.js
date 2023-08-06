import express from "express";
import { planprice } from "../controllers/planControllers.js";
const router = express.Router();

router.get("/plan-price", planprice);

export default router;
