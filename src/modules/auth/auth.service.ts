import AppError from "../../errorHelper/AppError";
import {
  createAccessTokenWithRefreshToken,
  userToken,
} from "../../utils/userToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";

const login = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new AppError(404, "Email does not exist");
  }

  const matchPassword = await bcrypt.compare(
    password as string,
    userExist.password,
  );
  if (!matchPassword) {
    throw new AppError(400, "Password does not match");
  }
  const token = userToken({
    email: userExist.email,
    id: userExist._id,
  });

  return { user: userExist, token };
};

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createAccessTokenWithRefreshToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};
export const authService = { login, createNewAccessToken };
