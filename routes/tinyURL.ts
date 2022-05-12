import express from "express";
const router = express.Router();
import {
  registerEmail,
  generateShortURL,
  handleShortenURL,
} from "../controllers/tinyURL";

router.route("/").post(registerEmail);
router.route("/:url").post(generateShortURL);
router.route("/:id").get(handleShortenURL);

export default router;
