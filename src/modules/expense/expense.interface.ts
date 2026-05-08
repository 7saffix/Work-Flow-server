import { Types } from "mongoose";

export interface IExpenseType {
  name: string;
  user: Types.ObjectId;
  isActive?: boolean;
}

export interface IExpense {
  user: Types.ObjectId;
  expenseType: Types.ObjectId;
  name: string;
  amount: number;
  description?: string;
}
