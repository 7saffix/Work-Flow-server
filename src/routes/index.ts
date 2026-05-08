import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { BrandRoutes } from "../modules/brand/brand.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { SupplierRoutes } from "../modules/supplier/supplier.route";

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
  {
    route: CategoryRoutes,
    path: "/category",
  },
  {
    route: SupplierRoutes,
    path: "/supplier",
  },
  {
    route: SupplierRoutes,
    path: "/customer",
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
