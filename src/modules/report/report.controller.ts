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

export const ReportController = { getDashboardSummary };
