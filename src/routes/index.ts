import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    route: userRoutes,
    path: "/user",
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
