import { NextFunction, Request, Response } from "express";
import { PurchaseService } from "./purchase.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createPurchase = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PurchaseService.createPurchase(req.body, req.user.id);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Purchase created successfully",
      data: result,
    });
  },
);
const getMyAllPurchases = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await PurchaseService.getMyAllPurchases(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Purchase retrieved successfully",
      data: result,
    });
  },
);

export const PurchaseController = {
  createPurchase,
  getMyAllPurchases,
};
