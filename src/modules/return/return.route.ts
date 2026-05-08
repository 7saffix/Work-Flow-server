import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import zodValidation from "../../middleware/zodValidation";
import { createReturnZodSchema } from "./return.validation";
import { ReturnController } from "./return.controller";

const router = Router();

router.post(
  "/create",
  authCheck(),
  zodValidation(createReturnZodSchema),
  ReturnController.createReturn,
);

router.get("/", authCheck(), ReturnController.getMyAllReturn);

export const ReturnRoutes = router;
