import express from "express";
import { registerEmail } from "../controllers/userController";

const router = express.Router();

router.route("/").post(registerEmail);

export default router;
