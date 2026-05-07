import { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env";
import { generateToken, verifyToken } from "./jwt";
import AppError from "../errorHelper/AppError";
import { User } from "../modules/user/user.model";

export const userToken = (jwtPayload: JwtPayload) => {
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES,
  );

  return { accessToken, refreshToken };
};

export const createAccessTokenWithRefreshToken = async (
  refreshToken: string,
) => {
  const tokenVerification = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET,
  ) as JwtPayload;

  if (!tokenVerification) {
    throw new AppError(400, "Invalid Token");
  }

  const user = await User.findOne({ email: tokenVerification.email });
  if (!user) throw new AppError(404, "User not found");

  const payload = {
    email: user.email,
    id: user._id,
  };
  const accessToken = generateToken(
    payload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  return accessToken;
};
