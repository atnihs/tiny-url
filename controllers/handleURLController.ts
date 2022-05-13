import nodeCache from "node-cache";
import { Request, Response } from "express";
import handleURLService from "../services/handleURLService";

const cache = new nodeCache();

export const handleShortenURL = async (req: Request, res: Response) => {
  const { tiny_url } = req.params;

  const original_url = await handleURLService.queryGetOriginalURL(tiny_url);

  cache.set(tiny_url, original_url);
  res.redirect(`${original_url}`);
};

export default {
  handleShortenURL,
};
