
import express from "express"
const router = express.Router();
import authRoutes from "./user.routes.js"
import expenseRoutes from "./expense.routes.js"
import budgetRoutes from "./budget.routes.js"
import dashboardRoutes from "./dashboard.routes.js"
import reportRoutes from "./report.routes.js"



router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/budgets', budgetRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);

export default router;