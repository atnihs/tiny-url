import { nanoid } from "nanoid";
import { Request, Response } from "express";
import userService from "../services/userService";

export const registerEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const api_key = nanoid(20);

  const result = userService.queryAddEmail(email, api_key);
  if (!result) {
    res.status(404).json({ message: "User exists!" });
  } else {
    res.status(200).json({ data: { email, api_key } });
  }

  // const isEmailExisted = await userService.checkEmailExists(email);
  // if (!isEmailExisted) {
  //   userService.queryRegister(email, api_key);
  //   res.status(200).json({
  //     message: "success",
  //     data: {
  //       email,
  //       api_key,
  //     },
  //   });
  // } else {
  //   res.status(200).json({
  //     message: "Users exist!",
  //   });
  // }
};
