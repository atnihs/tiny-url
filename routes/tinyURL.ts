import express from "express";
const router = express.Router();
import {
  registerEmail,
  generateShortURL,
  handleShortenURL,
} from "../controllers/tinyURL";
import { verifyCache } from "../middleware/verify";

router.route("/").post(registerEmail);
router.route("/url").post(generateShortURL);
router.route("/:id").get(verifyCache, handleShortenURL);

export default router;
