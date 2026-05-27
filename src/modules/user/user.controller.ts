import catchAsync from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Registration successful",
      data: result,
    });
  },
);
const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getProfile(req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "user retrieved successfully",
      data: result,
    });
  },
);

export const userController = { createUser, getProfile };
