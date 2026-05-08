import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import {
  createExpenseTypeZodSchema,
  createExpenseZodSchema,
  updateExpenseTypeZodSchema,
  updateExpenseZodSchema,
} from "./expense.validation";
import { ExpenseController, ExpenseTypeController } from "./expense.controller";

const router = Router();

router.post(
  "/expenseType/create",
  authCheck(),
  zodValidation(createExpenseTypeZodSchema),
  ExpenseTypeController.createExpenseType,
);

router.get(
  "/expenseType",
  authCheck(),
  ExpenseTypeController.getAllExpenseTypes,
);

router.post(
  "/create",
  authCheck(),
  zodValidation(createExpenseZodSchema),
  ExpenseController.createExpense,
);

router.get("/", authCheck(), ExpenseController.getAllExpenses);

router.patch(
  "/expenseType/:id",
  authCheck(),
  zodValidation(updateExpenseTypeZodSchema),
  ExpenseTypeController.updateExpenseType,
);

router.patch(
  "/:id",
  authCheck(),
  zodValidation(updateExpenseZodSchema),
  ExpenseController.updateExpense,
);

export const ExpenseRoutes = router;
