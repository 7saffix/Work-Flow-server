import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import { createPurchaseZodSchema } from "./purchase.validation";
import { PurchaseController } from "./purchase.controller";

const router = Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createPurchaseZodSchema),
  PurchaseController.createPurchase,
);

router.get("/", authCheck(), PurchaseController.getMyAllPurchases);

export const PurchaseRoutes = router;
