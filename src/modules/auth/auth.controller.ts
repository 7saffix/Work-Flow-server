import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { setCookies } from "../../utils/setCookie";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.login(req.body);
    setCookies(res, result.token);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "login successful",
      data: result,
    });
  },
);

export const authController = { login };
