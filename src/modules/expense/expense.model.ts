import { model, Schema } from "mongoose";
import { IExpense, IExpenseType } from "./expense.interface";

const expenseTypeSchema = new Schema<IExpenseType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

//Expense
export const ExpenseType = model<IExpenseType>(
  "ExpenseType",
  expenseTypeSchema,
);

const expenseSchema = new Schema<IExpense>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    expenseType: {
      type: Schema.Types.ObjectId,
      ref: "ExpenseType",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Expense = model<IExpense>("Expense", expenseSchema);
