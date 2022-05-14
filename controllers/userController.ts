import { nanoid } from "nanoid";
import { Request, Response } from "express";
import userService from "../services/userService";

export const registerEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = nanoid(20);

  const isEmailExisted = await userService.checkEmailExists(email);
  if (!isEmailExisted) {
    res.status(200).json({
      message: "Email exists",
    });
  } else {
    userService.queryAddEmail(email, api_key);
    res.status(200).json({
      data: { email, api_key },
    });
  }
};
