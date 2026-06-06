import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.post("/refresh-token", authController.createNewAccessToken);

export const authRoutes = router;
