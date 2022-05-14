import { Request, Response } from "express";
import urlService from "../services/urlService";
import utils from "../utils/handleURL";

import nodeCache from "node-cache";
const cache = new nodeCache();

export const handleShortenURL = async (req: Request, res: Response) => {
  const { id } = req.params;

  const [{ original_url }] = await urlService.queryGetOriginalURL(id);
  cache.set(id, original_url);
  const getProtocolURL = utils.getURL(original_url);
  res.redirect(`${getProtocolURL}`);
};

export const generateShortURL = async (req: Request, res: Response) => {
  const { name } = req.query as any;

  const randomURL = utils.shortUrl(name);

  const { api_key } = req.body;

  const isAPIKeyExist = await urlService.checkAPIKeyExists(api_key);
  if (!isAPIKeyExist) {
    res.status(404).json({
      message: "Unauthorized access to generate!",
    });
  } else {
    urlService.queryAddURL(name, randomURL);
    res.status(200).json({
      message: `Generate shorten URL ${randomURL}`,
    });
  }
};

export default {
  handleShortenURL,
  generateShortURL,
};
