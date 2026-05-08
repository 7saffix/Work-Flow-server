import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { SellService } from "./sell.service";

const createSell = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await SellService.createSell(req.body, req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Sell created successfully",
      data: result,
    });
  },
);
const getMyAllSells = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await SellService.getMyAllSells(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Sell retrieved successfully",
      data: result,
    });
  },
);

export const SellController = {
  createSell,
  getMyAllSells,
};
