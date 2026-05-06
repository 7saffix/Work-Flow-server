import AppError from "../../errorHelper/AppError";
import { generateToken } from "../../utils/jwt";
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
  const userToken = generateToken({
    email: userExist.email,
    id: userExist._id,
  });

  return { user: userExist, token: userToken };
};

export const authService = { login };
