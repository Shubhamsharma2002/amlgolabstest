import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { 
    addExpense, 
    getExpenses, 
    updateExpense, 
    deleteExpense 
} from "../controllers/expense.controller.js";

const router = Router();

// Saare expense routes ke liye login zaroori hai [cite: 11]
router.use(verifyJWT); 

// Route: /api/v1/expenses/
router.route("/")
    .post(addExpense)   // Add new expense [cite: 13, 14]
    .get(getExpenses);  // Get all with filters/search [cite: 19, 21]

// Route: /api/v1/expenses/:id
router.route("/:id")
    .patch(updateExpense)  // Edit expense [cite: 14]
    .delete(deleteExpense); // Delete expense [cite: 14]

export default router;