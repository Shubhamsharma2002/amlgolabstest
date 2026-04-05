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
        const response = await axios.post(process.env.PYTHON_API_URL, {
            expenses: [] // Aapka data
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};