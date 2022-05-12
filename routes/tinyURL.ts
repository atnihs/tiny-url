import express from "express";
const router = express.Router();
import {
  registerEmail,
  generateLongURL,
  handleShortenURL,
} from "../controllers/tinyURL";

router.route("/").get(registerEmail);
router.route("/:url").post(generateLongURL);
router.route("/:id").get(handleShortenURL);

export default router;
