import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    route: userRoutes,
    path: "/user",
  },
  {
    route: authRoutes,
    path: "/auth",
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
