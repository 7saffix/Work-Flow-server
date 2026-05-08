import AppError from "../../errorHelper/AppError";
import { Expense, ExpenseType } from "./expense.model";

const createExpenseType = async (userId: string, payload: any) => {
  const result = await ExpenseType.create({
    ...payload,
    user: userId,
  });

  return result;
};

const getAllExpenseTypes = async (userId: string) => {
  return await ExpenseType.find({
    user: userId,
    isActive: true,
  });
};

const updateExpenseType = async (id: string, payload: Partial<any>) => {
  const expenseType = await ExpenseType.findById(id);

  if (!expenseType) {
    throw new AppError(404, "Expense type not found");
  }

  const result = await ExpenseType.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  });

  return result;
};

export const ExpenseTypeService = {
  createExpenseType,
  getAllExpenseTypes,
  updateExpenseType,
};

//Expense
const createExpense = async (userId: string, payload: any) => {
  const result = await Expense.create({
    ...payload,
    user: userId,
  });

  return result;
};

const getAllExpenses = async (userId: string) => {
  return await Expense.find({
    user: userId,
  }).populate("expenseType");
};

const updateExpense = async (id: string, payload: Partial<any>) => {
  const expense = await Expense.findById(id);

  if (!expense) {
    throw new AppError(404, "Expense not found");
  }

  const result = await Expense.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  });

  return result;
};

export const ExpenseService = {
  createExpense,
  getAllExpenses,
  updateExpense,
};
