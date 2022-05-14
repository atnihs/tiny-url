import express from "express";
import { generateShortURL } from "../controllers/urlController";
import { handleShortenURL } from "../controllers/urlController";
import { verifyCache } from "../middleware/verify";

const router = express.Router();

router.route("/").post(generateShortURL);
router.route("/:id").get(verifyCache, handleShortenURL);

export default router;
