import jwt, { JwtPayload } from "jsonwebtoken";
import envVars from "../config/env";

export const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, envVars.JWT_SECRET, { expiresIn: "10" });
  return token;
};
