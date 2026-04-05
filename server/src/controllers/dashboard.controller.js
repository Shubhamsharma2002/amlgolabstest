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

export const getSmartSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Database se user ke real expenses nikalo
        // Hum pichle 30-40 din ka data bhej sakte hain analysis ke liye
        const userExpenses = await Expense.find({ owner: userId }).sort({ date: -1 });

        // Agar koi kharcha nahi mila toh Python ko bhejne ki zaroorat hi nahi
        if (!userExpenses || userExpenses.length === 0) {
            return res.status(200).json({ 
                success: true, 
                suggestions: ["Bhai, pehle kuch kharche toh add karo tabhi toh suggest karunga!"] 
            });
        }

        // 2. Real data Python API ko bhejo
        const response = await axios.post(process.env.PYTHON_API_URL, {
            expenses: userExpenses 
        });

        // 3. Python se aaye suggestions frontend ko bhej do
        res.json(response.data);

    } catch (error) {
        console.error("AI Error:", error.message);
        res.status(500).json({ 
            success: false, 
            error: "AI Coach offline hai", 
            details: error.message 
        });
    }
};