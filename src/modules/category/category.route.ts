import express from "express";
import zodValidation from "../../middleware/zodValidation";
import {
  createCategoryZodSchema,
  updateCategoryZodSchema,
} from "./category.validation";
import { CategoryController } from "./category.controller";
import { authCheck } from "../../middleware/authCheck";

const router = express.Router();

router.post(
  "/",
  zodValidation(createCategoryZodSchema),
  authCheck(),
  CategoryController.createCategory,
);

router.get("/", authCheck(), CategoryController.getAllCategories);
router.patch(
  "/:id",
  zodValidation(updateCategoryZodSchema),
  authCheck(),
  CategoryController.updateCategory,
);

export const CategoryRoutes = router;
