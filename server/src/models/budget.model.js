import mongoose, { Schema } from "mongoose";

const budgetSchema = new Schema({
    category: { 
        type: String, 
        required: true, 
        enum: ["Food", "Rent", "Shopping", "Travel", "Bills", "Others"] 
    },
    amount: { type: Number, required: true }, // Monthly Limit 
    month: { type: Number, required: true }, // 1-12
    year: { type: Number, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true // [cite: 11]
    }
}, { timestamps: true });

// Prevent duplicate budget for same category in same month
budgetSchema.index({ category: 1, month: 1, year: 1, owner: 1 }, { unique: true });

export const Budget = mongoose.model("Budget", budgetSchema);