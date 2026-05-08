import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import {
  createProductZodSchema,
  updateProductZodSchema,
} from "./product.validation";
import { ProductController } from "./product.controller";

const router = Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createProductZodSchema),
  ProductController.createProduct,
);

router.get("/", ProductController.getAllProducts);

router.patch(
  "/:id",
  authCheck(),
  zodValidation(updateProductZodSchema),
  ProductController.updateProduct,
);

export const ProductRoutes = router;
