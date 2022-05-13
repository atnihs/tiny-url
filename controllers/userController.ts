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

// export const handleShortenURL = (req: Request, res: Response) => {
//   const { id } = req.params;

//   connectDB.execute(
//     "SELECT original_url FROM `url` WHERE tiny_url = ?",
//     [id],
//     function (err, results, fields) {
//       if (err) throw err;
//       const [{ original_url }] = results as { original_url: any }[];
//       // const data = decodeURIComponent(original_url);
//       cache.set(id, original_url);
//       res.redirect(original_url);
//     }
//   );
// };
