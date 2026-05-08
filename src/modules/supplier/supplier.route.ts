import express from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import {
  createSupplierZodSchema,
  updateSupplierZodSchema,
} from "./supplier.validation";
import { SupplierController } from "./supplier.controller";

const router = express.Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createSupplierZodSchema),
  SupplierController.createSupplier,
);

router.get("/", authCheck(), SupplierController.getAllSuppliers);

router.patch(
  "/:id",
  authCheck(),
  zodValidation(updateSupplierZodSchema),
  SupplierController.updateSupplier,
);

export const SupplierRoutes = router;
