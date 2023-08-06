import express from "express";
import { registerUser, userAuth } from "../controllers/userControllers.js";
const router = express.Router();

router.post("/", registerUser);
router.post("/login", userAuth);

export default router;
