import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { ReportService } from "./report.service";

const getDashboardSummary = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ReportService.getDashboardSummary(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Dashboard summary retrieved successfully",
      data: result,
    });
  },
);

const getPurchaseReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ReportService.getPurchaseReport(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Purchase report retrieved successfully",
      data: result,
    });
  },
);
const getSalesReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ReportService.getSalesReport(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Sales report retrieved successfully",
      data: result,
    });
  },
);
const getInventoryReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ReportService.getInventoryReport(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Inventory retrieved successfully",
      data: result,
    });
  },
);
const getExpenseReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const result = await ReportService.getExpenseReport(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Inventory retrieved successfully",
      data: result,
    });
  },
);

const getCustomerReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ReportService.getCustomerReport(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Customer report retrieved successfully",
      data: result,
    });
  },
);

const getSupplierReport = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ReportService.getSupplierReport(userId, req.query);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Supplier report retrieved successfully",
      data: result,
    });
  },
);

export const ReportController = {
  getDashboardSummary,
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getExpenseReport,
  getCustomerReport,
  getSupplierReport,
};
