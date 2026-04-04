import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
    amount: { type: Number, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ["Food", "Rent", "Shopping", "Travel", "Bills", "Others"] 
    },
    paymentMethod: { 
        type: String, 
        required: true, 
        enum: ["UPI", "Credit Card", "Cash", "Debit Card"] 
    },
    date: { type: Date, default: Date.now },
    notes: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);