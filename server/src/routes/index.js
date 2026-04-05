import express from "express"
const router = express.Router();
import authRoutes from "./user.routes.js"
import expenseRoutes from "./expense.routes.js"
import budgetRoutes from "./budget.routes.js"
import dashboardRoutes from "./dashboard.routes.js"
import reportRoutes from "./report.routes.js"
// 1. Admin routes import karo
import adminRoutes from "./admin.routes.js" 

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);
router.use('/budgets', budgetRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);

// 2. Admin entry point define karo
router.use('/admin', adminRoutes); 

export default router;