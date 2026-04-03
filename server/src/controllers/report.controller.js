import { MonthlyReport } from "../config/sql.config.js";
import { Expense } from "../models/expense.model.js";
import { Budget } from "../models/budget.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const generateAndSaveReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const month = now.getMonth() + 1; // Current Month
        const year = now.getFullYear();

        // 1. Fetch data from MongoDB for the month
        const expenses = await Expense.find({
            owner: userId,
            date: {
                $gte: new Date(year, month - 1, 1),
                $lte: new Date(year, month, 0)
            }
        });

        const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        // 2. Find Top Category
        const categoryMap = {};
        expenses.forEach(ex => {
            categoryMap[ex.category] = (categoryMap[ex.category] || 0) + ex.amount;
        });
        const topCategory = Object.keys(categoryMap).reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b, "N/A");

        // 3. Find Overbudget Categories (Comparing with Budget Model)
        const budgets = await Budget.find({ owner: userId, month, year });
        const overbudget = budgets
            .filter(b => (categoryMap[b.category] || 0) > b.amount)
            .map(b => b.category)
            .join(", ");

        // 4. Save to SQL (SQLite)
        const report = await MonthlyReport.create({
            userId: userId.toString(),
            monthYear: `${now.toLocaleString('default', { month: 'long' })} ${year}`,
            totalSpent,
            topCategory,
            overbudgetCategories: overbudget || "None"
        });

        return res.status(201).json(new ApiResponse(201, report, "Monthly report saved in SQL"));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📜 Past 3 Months Reports (Point 45)
export { getPastReports };
const getPastReports = async (req, res) => {
    const reports = await MonthlyReport.findAll({
        where: { userId: req.user._id.toString() },
        limit: 3,
        order: [['createdAt', 'DESC']]
    });
    return res.json(new ApiResponse(200, reports, "Past reports fetched from SQL"));
};