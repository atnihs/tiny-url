import nodeCache from "node-cache";
import { Request, Response } from "express";
import handleURLService from "../services/handleURLService";
import utils from "../utils/handleURL";

const cache = new nodeCache();

export const handleShortenURL = async (req: Request, res: Response) => {
  const { tiny_url } = req.params;

  const [{ original_url }] = await handleURLService.queryGetOriginalURL(
    tiny_url
  );
  cache.set(tiny_url, original_url);
  const getProtocolURL = utils.getURL(original_url);
  res.redirect(`${getProtocolURL}`);
};

export default {
  handleShortenURL,
};
