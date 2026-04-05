import { Budget } from "../models/budget.model.js";
import { Expense } from "../models/expense.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const setOrUpdateBudget = async (req, res, next) => {
    try {
        const { category, amount, month, year } = req.body;

        const budget = await Budget.findOneAndUpdate(
            { category, month, year, owner: req.user._id },
            { amount },
            { upsert: true, new: true }
        );

        return res.status(200).json(new ApiResponse(200, budget, "Budget set successfully"));
    } catch (error) {
        next(error);
    }
};

export const getBudgetAlerts = async (req, res, next) => {
    try {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        // 1. Get all budgets for the user
        const budgets = await Budget.find({ 
            owner: req.user._id, 
            month: currentMonth, 
            year: currentYear 
        });

        // 2. Calculate total spent per category in current month
        const alerts = await Promise.all(budgets.map(async (b) => {
            const totalSpent = await Expense.aggregate([
                {
                    $match: {
                        owner: req.user._id,
                        category: b.category,
                        date: {
                            $gte: new Date(`${currentYear}-${currentMonth}-01`),
                            $lte: new Date()
                        }
                    }
                },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const spent = totalSpent[0]?.total || 0;
            const percentage = (spent / b.amount) * 100;

            let status = "Under Control";
            if (percentage >= 100) status = "Limit Exceeded!"; 
            else if (percentage >= 80) status = "Warning: 80% Reached"; 

            return {
                category: b.category,
                limit: b.amount,
                spent,
                percentage,
                status
            };
        }));

        return res.status(200).json(new ApiResponse(200, alerts, "Budget alerts fetched"));
    } catch (error) {
        next(error);
    }
};