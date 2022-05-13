import { connectDB } from "../database/connect";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import nodeCache from "node-cache";
import { shortUrl } from "../utils/handleURL";
import userService from "../services/userService";

const cache = new nodeCache();

export const registerEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = nanoid(20);

  const isEmailExisted = await userService.checkEmailExists(email);
  if (!isEmailExisted) {
    userService.queryRegister(email, api_key);
    res.status(200).json({
      message: "success",
      data: {
        email,
        api_key,
      },
    });
  } else {
    res.status(200).json({
      message: "Users exist!",
    });
  }
};

export const generateShortURL = (req: Request, res: Response) => {
  const { name } = req.query;

  // const original_url = encodeURIComponent(`${name}`);

  const randomURL = shortUrl(name);

  // check API_KEY
  const { api_key } = req.body;
  connectDB.execute(
    "SELECT EXISTS ( SELECT * FROM `users` WHERE api_key = ?) as result",
    [api_key],
    function (err, results, fields) {
      if (err) throw err;
      const [{ result }] = results as { result: number }[];

      if (result) {
        // add newURL
        connectDB.query(
          "INSERT INTO `url` (original_url, tiny_url) VALUES (?, ?)",
          [name, randomURL],
          function (err: any, result: any) {
            if (err) throw err;
            res.status(200).json({
              message: `Generate shorten URL ${randomURL}`,
            });
          }
        );
      } else {
        res.status(404).json({
          message: "Unauthorized access to generate!",
        });
      }
    }
  );
};

export const handleShortenURL = (req: Request, res: Response) => {
  const { id } = req.params;

  connectDB.execute(
    "SELECT original_url FROM `url` WHERE tiny_url = ?",
    [id],
    function (err, results, fields) {
      if (err) throw err;
      const [{ original_url }] = results as { original_url: any }[];
      // const data = decodeURIComponent(original_url);
      cache.set(id, original_url);
      res.redirect(original_url);
    }
  );
};
