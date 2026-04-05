import { Expense } from "../models/expense.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 1. Create Expense 
export const addExpense = async (req, res, next) => {
    try {
        const { amount, category, paymentMethod, date, notes } = req.body;

        if (!amount || !category || !paymentMethod) {
            throw new ApiError(400, "Amount, Category and Payment Method are required");
        }

        const expense = await Expense.create({
            amount,
            category,
            paymentMethod,
            date: date || Date.now(),
            notes,
            owner: req.user._id 
        });

        return res.status(201).json(new ApiResponse(201, expense, "Expense added successfully"));
    } catch (error) {
        next(error);
    }
};

// 2. Get All Expenses with Filters & Search 
export const getExpenses = async (req, res, next) => {
    try {
        const { category, paymentMethod, date, search } = req.query; 
        
        let query = { owner: req.user._id }; 

        // 1. Single Date Search Logic (Sabse Important)
        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0); // Din ki shuruat (12:00 AM)

            const end = new Date(date);
            end.setHours(23, 59, 59, 999); // Din ka anth (11:59 PM)

            query.date = {
                $gte: start,
                $lte: end
            }; 
        }

        // 2. Other Filters 
        if (category) query.category = category;
        if (paymentMethod) query.paymentMethod = paymentMethod;

        // 3. Search Logic 
        if (search) {
            query.notes = { $regex: search, $options: "i" };
        }

        const expenses = await Expense.find(query).sort({ date: -1 });
        return res.status(200).json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
    } catch (error) {
        next(error);
    }
};

// 3. Update Expense [cite: 14]
export const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const expense = await Expense.findOneAndUpdate(
            { _id: id, owner: req.user._id }, // Security check: owner hona chahiye
            { $set: updateData },
            { new: true }
        );

        if (!expense) throw new ApiError(404, "Expense not found or unauthorized");

        return res.status(200).json(new ApiResponse(200, expense, "Expense updated"));
    } catch (error) {
        next(error);
    }
};

// 4. Delete Expense [cite: 14]
export const deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!expense) throw new ApiError(404, "Expense not found");

        return res.status(200).json(new ApiResponse(200, {}, "Expense deleted"));
    } catch (error) {
        next(error);
    }
};