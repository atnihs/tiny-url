import express from "express";
const router = express.Router();
import {
  registerEmail,
  generateShortURL,
  handleShortenURL,
} from "../controllers/tinyURL";

router.route("/:id").get(handleShortenURL);
router.route("/:url").post(generateShortURL);
router.route("/").post(registerEmail);

export default router;
