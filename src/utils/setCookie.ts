import { Response } from "express";

export const setCookies = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });
};
