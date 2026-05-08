import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import { createSellZodSchema } from "./sell.validation";
import { SellController } from "./sell.controller";

const router = Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createSellZodSchema),
  SellController.createSell,
);

router.get("/", authCheck(), SellController.getMyAllSells);

export const SellRoutes = router;
