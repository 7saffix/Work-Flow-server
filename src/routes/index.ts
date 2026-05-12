import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { BrandRoutes } from "../modules/brand/brand.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { SupplierRoutes } from "../modules/supplier/supplier.route";
import { ExpenseRoutes } from "../modules/expense/expense.route";
import { ProductRoutes } from "../modules/product/product.route";
import { PurchaseRoutes } from "../modules/purchase/purchase.route";
import { SellRoutes } from "../modules/sell/sell.route";
import { ReturnRoutes } from "../modules/return/return.route";
import { ReportRoutes } from "../modules/report/report.route";
import { CustomerRoutes } from "../modules/customer/customer.route";

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
    route: CustomerRoutes,
    path: "/customer",
  },
  {
    route: ExpenseRoutes,
    path: "/expense",
  },
  {
    route: ProductRoutes,
    path: "/product",
  },
  {
    route: PurchaseRoutes,
    path: "/purchase",
  },
  {
    route: SellRoutes,
    path: "/sell",
  },
  {
    route: ReturnRoutes,
    path: "/return",
  },
  {
    route: ReportRoutes,
    path: "/report",
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
