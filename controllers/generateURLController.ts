import { Request, Response } from "express";
import utils from "../utils/handleURL";
import generateURLService from "../services/generateURLService";

export const generateShortURL = async (req: Request, res: Response) => {
  const { name } = req.query as any;
  
  const randomURL = utils.shortUrl(name);

  const { api_key } = req.body;

  const isAPIKeyExist = await generateURLService.checkAPIKeyExists(api_key);
  if (isAPIKeyExist) {
    generateURLService.queryAddURL(name, randomURL);
    res.status(200).json({
      message: `Generate shorten URL ${randomURL}`,
    });
  } else {
    res.status(404).json({
      message: "Unauthorized access to generate!",
    });
  }
};
