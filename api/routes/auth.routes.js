import express from "express";
import AuthController from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", AuthController.signin);
router.post("/register", AuthController.signup);
export default router;
