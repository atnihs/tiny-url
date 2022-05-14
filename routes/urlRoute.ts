import express from "express";
import { generateShortURL } from "../controllers/generateURLController";
import { handleShortenURL } from "../controllers/handleURLController";
import { verifyCache } from "../middleware/verify";

const router = express.Router();

router.route("/").post(generateShortURL);
router.route("/:id").get(verifyCache, handleShortenURL);

export default router;
