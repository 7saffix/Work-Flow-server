import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { SupplierService } from "./supplier.service";
import sendResponse from "../../utils/sendResponse";

const createSupplier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await SupplierService.createSupplier(userId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Supplier created successfully",
      data: result,
    });
  },
);

const getAllSuppliers = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await SupplierService.getAllSuppliers(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Suppliers retrieved successfully",
    data: result,
  });
});

const updateSupplier = catchAsync(async (req: Request, res: Response) => {
  const result = await SupplierService.updateSupplier(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Supplier updated successfully",
    data: result,
  });
});

export const SupplierController = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
};
