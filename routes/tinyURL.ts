import express from "express";
const router = express.Router();
import { registerEmail } from "../controllers/userController";
import { generateShortURL } from "../controllers/generateURLController"
import { verifyCache } from "../middleware/verify";

router.route("/").post(registerEmail);
router.route("/url").post(generateShortURL);
// router.route("/:id").get(verifyCache, handleShortenURL);

export default router;
