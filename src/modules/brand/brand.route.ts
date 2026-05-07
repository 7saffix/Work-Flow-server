import express from "express";
import { BrandController } from "./brand.controller";
import { createBrandZodSchema } from "./brand.validation";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";

const router = express.Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createBrandZodSchema),
  BrandController.createBrand,
);
router.get("/", BrandController.getAllBrands);
router.patch(
  "/:id",
  authCheck(),
  zodValidation(createBrandZodSchema),
  BrandController.updateBrand,
);

export const BrandRoutes = router;
