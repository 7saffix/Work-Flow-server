import express from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import {
  createCustomerZodSchema,
  updateCustomerZodSchema,
} from "./customer.validation";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createCustomerZodSchema),
  CustomerController.createCustomer,
);

router.get("/", authCheck(), CustomerController.getAllCustomers);

router.patch(
  "/:id",
  authCheck(),
  zodValidation(updateCustomerZodSchema),
  CustomerController.updateCustomer,
);

export const CustomerRoutes = router;
