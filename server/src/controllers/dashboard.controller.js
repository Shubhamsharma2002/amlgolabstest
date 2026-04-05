import { Expense } from "../models/expense.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios"
export const getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Sabhi requirements ke liye aggregation
        const stats = await Expense.aggregate([
            {
                $match: {
                    owner: userId,
                    date: { $gte: startOfMonth }
                }
            },
            {
                $facet: {
                    "totalAndCategory": [
                        { $group: { _id: "$category", total: { $sum: "$amount" } } }
                    ],
                    "paymentMethods": [
                        { $group: { _id: "$paymentMethod", count: { $sum: 1 } } },
                        { $sort: { count: -1 } },
                        { $limit: 3 }
                    ],
                    "timeSeries": [
                        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, amount: { $sum: "$amount" } } },
                        { $sort: { "_id": 1 } }
                    ]
                }
            }
        ]);

        const data = stats[0];
        const totalSpent = data.totalAndCategory.reduce((acc, curr) => acc + curr.total, 0);
        const topCategory = data.totalAndCategory.sort((a, b) => b.total - a.total)[0]?._id || "N/A";

        return res.status(200).json(new ApiResponse(200, {
            totalSpent, // Requirement 1 
            topCategory, // Requirement 2 
            topPayments: data.paymentMethods, // Requirement 3 
            categoryStats: data.totalAndCategory, // Requirement 4 
            timeStats: data.timeSeries // Requirement 
        }, "Dashboard data fetched"));
    } catch (error) {
        next(error);
    }
};

// server/src/controllers/dashboard.controller.js

export const getSmartSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;
        const userExpenses = await Expense.find({ owner: userId }).sort({ date: -1 });

        if (!userExpenses || userExpenses.length === 0) {
            return res.status(200).json({ 
                success: true, 
                suggestions: ["Abhi koi data nahi hai analysis ke liye."] 
            });
        }

        // FIX: URL ke saath endpoint attach karo
        const pythonEndpoint = `${process.env.PYTHON_API_URL}/api/analyze`;

        const response = await axios.post(pythonEndpoint, {
            expenses: userExpenses 
        });

        // Consistent response format (ApiResponse use karo agar frontend expect kar raha hai)
        return res.status(200).json({
            success: true,
            suggestions: response.data.suggestions || []
        });

    } catch (error) {
        // Detailed logging taaki pata chale EXACTLY kya fail hua
        console.error("AI ERROR DETAILS:", error.response?.data || error.message);
        
        res.status(500).json({ 
            success: false, 
            error: "AI Coach connection failed", 
            details: error.message 
        });
    }
};