import { Router } from "express";
import { authCheck } from "../../middleware/authCheck";
import { ReportController } from "./report.controller";

const router = Router();

router.get("/dashboard", authCheck(), ReportController.getDashboardSummary);
router.get("/sales", authCheck(), ReportController.getSalesReport);
router.get("/purchase", authCheck(), ReportController.getPurchaseReport);
router.get("/inventory", authCheck(), ReportController.getInventoryReport);
router.get("/expense", authCheck(), ReportController.getExpenseReport);
router.get("/customer", authCheck(), ReportController.getCustomerReport);
router.get("/supplier", authCheck(), ReportController.getSupplierReport);

export const ReportRoutes = router;
