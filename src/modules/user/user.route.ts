import { Router } from "express";
import { userController } from "./user.controller";
import zodValidation from "../../middleware/zodValidation";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  // zodValidation(createUserZodSchema),
  userController.createUser,
);

export const userRoutes = router;
