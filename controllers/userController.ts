import { nanoid } from "nanoid";
import { Request, Response } from "express";
import userService from "../services/userService";

export const registerEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = nanoid(20);

  const isAddEmail = await userService.queryAddEmail(email, api_key);
  if (!isAddEmail) {
    res.status(200).json({
      message: "User exists",
    });
  } else {
    res.status(200).json({
      data: { email, api_key },
    });
  }
};
