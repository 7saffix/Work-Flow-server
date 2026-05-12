import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import { ReportController } from "./report.controller";

const router = Router();

router.get("/dashboard", authCheck(), ReportController.getDashboardSummary);

export const ReportRoutes = router;
