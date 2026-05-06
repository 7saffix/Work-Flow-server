import AppError from "../../errorHelper/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const createUser = async (payload: IUser) => {
  const { email, password, ...rest } = payload;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new AppError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password as string, 10);

  const user = await User.create({
    email,
    password: hashPassword,
    ...rest,
  });
  return user;
};

export const userService = { createUser };
