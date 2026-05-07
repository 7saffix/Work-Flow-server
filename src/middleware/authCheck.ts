import { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env";
import AppError from "../errorHelper/AppError";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const authCheck =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        throw new AppError(400, "no token received");
      }
      const verifiedToken = verifyToken(
        token,
        envVars.JWT_ACCESS_SECRET,
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(409, "invalid token");
      }
      const user = await User.findOne({ email: verifiedToken.email });
      if (!user) throw new AppError(404, "User not found");
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
