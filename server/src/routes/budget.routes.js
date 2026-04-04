import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { 
    setOrUpdateBudget, 
    getBudgetAlerts 
} from "../controllers/budget.controller.js";

const router = Router();

// Sabhi budget routes ke liye login hona zaroori hai [cite: 11]
router.use(verifyJWT);

// Route: /api/v1/budgets/
// Isme body mein category, amount, month aur year bhejenge [cite: 23]
router.route("/set").post(setOrUpdateBudget);

// Route: /api/v1/budgets/alerts
// Yeh API batayega ki kaunsi category 80% ya 100% cross kar gayi hai 
router.route("/alerts").get(getBudgetAlerts);

export default router;