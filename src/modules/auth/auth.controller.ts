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

const createNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const result = await authService.createNewAccessToken(refreshToken);
    setCookies(res, result);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "generate new accessToken successfully",
      data: result,
    });
  },
);

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "log out successful",
      data: null,
    });
  },
);

export const authController = { login, createNewAccessToken, logOut };
