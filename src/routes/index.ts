import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { BrandRoutes } from "../modules/brand/brand.route";

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
  {
    route: BrandRoutes,
    path: "/brand",
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
