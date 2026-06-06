import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BrandService } from "./brand.service";

const createBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await BrandService.createBrand({
      user: userId,
      ...req.body,
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Brand created successfully",
      data: result,
    });
  },
);

const getAllBrands = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await BrandService.getAllBrands(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Brand retrieved successfully",
      data: result,
    });
  },
);

const updateBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const result = await BrandService.updateBrand(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Brand updated successfully",
      data: result,
    });
  },
);

export const BrandController = {
  createBrand,
  getAllBrands,
  updateBrand,
};
