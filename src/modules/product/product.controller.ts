import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ProductService.createProduct(userId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: result,
    });
  },
);

const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ProductService.getAllProducts(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Products retrieved successfully",
      data: result,
    });
  },
);

const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProductService.updateProduct(
      req.params.id as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Product updated successfully",
      data: result,
    });
  },
);

export const ProductController = {
  createProduct,
  getAllProducts,
  updateProduct,
};
