import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { 
    addExpense, 
    getExpenses, 
    updateExpense, 
    deleteExpense 
} from "../controllers/expense.controller.js";

const router = Router();

// Saare expense routes ke liye login zaroori hai 
router.use(verifyJWT); 

// Route: /api/v1/expenses/
router.route("/")
    .post(addExpense)   // Add new expense 
    .get(getExpenses);  // Get all with filters/search 

// Route: /api/v1/expenses/:id
router.route("/:id")
    .patch(updateExpense)  // Edit expense 
    .delete(deleteExpense); // Delete expense 

export default router;