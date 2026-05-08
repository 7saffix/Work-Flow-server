import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ExpenseService, ExpenseTypeService } from "./expense.service";

const createExpenseType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ExpenseTypeService.createExpenseType(userId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Expense type created successfully",
      data: result,
    });
  },
);

const getAllExpenseTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ExpenseTypeService.getAllExpenseTypes(userId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Expense types retrieved successfully",
      data: result,
    });
  },
);

const updateExpenseType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ExpenseTypeService.updateExpenseType(
      req.params.id as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Expense type updated successfully",
      data: result,
    });
  },
);

export const ExpenseTypeController = {
  createExpenseType,
  getAllExpenseTypes,
  updateExpenseType,
};

//Expense
const createExpense = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const result = await ExpenseService.createExpense(userId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Expense created successfully",
      data: result,
    });
  },
);

const getAllExpenses = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await ExpenseService.getAllExpenses(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Expenses retrieved successfully",
    data: result,
  });
});

const updateExpense = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ExpenseService.updateExpense(
      req.params.id as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Expense updated successfully",
      data: result,
    });
  },
);

export const ExpenseController = {
  createExpense,
  getAllExpenses,
  updateExpense,
};
