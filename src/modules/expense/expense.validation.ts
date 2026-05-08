import z from "zod";

export const createExpenseTypeZodSchema = z.object({
  name: z.string({
    error: "Expense type name is required",
  }),
});

export const updateExpenseTypeZodSchema = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const createExpenseZodSchema = z.object({
  expenseType: z.string({
    error: "Expense type is required",
  }),

  name: z.string({
    error: "Expense name is required",
  }),

  amount: z.number({
    error: "Amount is required",
  }),

  description: z.string().optional(),
});

export const updateExpenseZodSchema = z.object({
  expenseType: z.string().optional(),
  name: z.string().optional(),
  amount: z.number().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
