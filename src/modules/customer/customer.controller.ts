import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CustomerService } from "./customer.service";

const createCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await CustomerService.createCustomer(userId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Customer created successfully",
      data: result,
    });
  },
);

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.getAllCustomers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Customer retrieved successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerService.updateCustomer(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Customer updated successfully",
    data: result,
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
};
