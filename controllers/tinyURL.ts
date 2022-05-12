// const tinyURL = require('../routes/tinyURL');
import { connectDB } from "../database/connect";
import { nanoid } from "nanoid";
import { Request, Response } from "express";

export const registerEmail = (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = nanoid(20);

  connectDB.execute(
    "SELECT EXISTS ( SELECT * FROM `users` WHERE email = ?) as result",
    [email],
    //   TODO: handle error
    function (err, results, fields) {
      const [{ result }] = results as { result: number }[];
      if (!result) {
        connectDB.query(
          "INSERT INTO `users` (email, api_key) VALUES (?, ?)",
          [email, api_key],
          function (err: any, result: any) {
            if (err) throw err;
            res.status(200).json({
              message: "success",
              data: {
                email,
                api_key,
              },
            });
          }
        );
      } else {
        res.status(404).json({
          message: "Users exist!",
        });
      }
    }
  );
};

const URL_Regex = new RegExp("^(http|https)://", "i");
function getURL(url: any) {
  let checkURL = URL_Regex.test(url);
  return checkURL ? checkURL : "https://" + url;
}

function hashRandomURL() {
  let randomString = Math.random().toString(32).substring(2, 8);
  return randomString;
}

function shortUrl(url: any) {
  let generateURL = getURL(url);
  return hashRandomURL();
}

export const generateLongURL = (req: Request, res: Response) => {
  const { url } = req.params;

  const original_url = getURL(url);
  let randomURL = shortUrl(url);

  // check API_KEY
  const { api_key } = req.body;
  connectDB.execute(
    "SELECT EXISTS ( SELECT * FROM `users` WHERE api_key = ?) as result",
    [api_key],
    function (err, results, fields) {
      const [{ result }] = results as { result: number }[];
      console.log(result);
      if (result) {
        // add newURL
        connectDB.query(
          "INSERT INTO `url` (original_url, tiny_url) VALUES (?, ?)",
          [url, randomURL],
          function (err: any, result: any) {
            if (err) throw err;
            res.status(200).json({
              message: `Generate shorten URL ${randomURL}`,
            });
          }
        );
      } else {
        res.status(404).json({
          message: "Unauthorized access to generateLongURL!",
        });
      }
    }
  );
};

export const handleShortenURL = (req: Request, res: Response) => {
  const { id } = req.params;
  //   console.log(id);
  connectDB.execute(
    "SELECT original_url FROM `url` WHERE tiny_url = ?",
    [id],
    function (err, results, fields) {
      const [{ original_url }] = results as { original_url: number }[];
      //   console.log(results);
      res.redirect(200, `${original_url}`);
    }
  );
};
