import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ReturnService } from "./return.service";

const createReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ReturnService.createReturn(req.body, req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Return created successfully",
      data: result,
    });
  },
);
const getMyAllReturn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ReturnService.getMyAllReturn(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Return retrieved successfully",
      data: result,
    });
  },
);

export const ReturnController = {
  createReturn,
  getMyAllReturn,
};
