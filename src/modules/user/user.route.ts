import { Router } from "express";
import { userController } from "./user.controller";
import zodValidation from "../../middleware/zodValidation";
import { createUserZodSchema } from "./user.validation";
import { authCheck } from "../../middleware/authCheck";

const router = Router();

router.post(
  "/register",
  zodValidation(createUserZodSchema),
  userController.createUser,
);
router.get("/me", authCheck(), userController.getProfile);

export const userRoutes = router;
