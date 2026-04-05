"use client";

import React from "react";
import { InputField } from "../ui/Input";
import { SelectField } from "../ui/SelectField";

const categoryOptions = [
  { label: "Food 🍔", value: "Food" },
            { label: "Rent 🏠", value: "Rent" },
            { label: "Shopping 🛍️", value: "Shopping" },
            { label: "Travel 🛍️", value: "Travel" },
            { label: "Bills 🛍️", value: "Bills" },
             { label: "Others 🛍️", value: "Others" }
];

export default function BudgetModal({ form, handleChange, onSave, onClose }) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation Logic
    if (!form.category || !form.limit) {
      alert("Bhai, saari fields bharna zaroori hai! ❗");
      return;
    }

    if (Number(form.limit) <= 0) {
      alert("Limit ₹0 se zyada honi chahiye! 💰");
      return;
    }

    onSave(); 
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4"
      onClick={onClose} 
    >
      <div
        className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <span className="text-3xl text-purple-600 font-bold">₹</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Set Monthly Budget</h2>
          <p className="text-gray-500 text-sm mt-1 font-medium italic">Smartly track your limits</p>
        </div>

        {/* Reusable Form Fields */}
        <div className="space-y-1">
          <SelectField 
            label="Category" 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            options={categoryOptions} 
          />

          <InputField 
            label="Monthly Limit" 
            type="number" 
            name="limit" 
            value={form.limit} 
            onChange={handleChange} 
            placeholder="e.g. 5000" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95 border border-transparent hover:border-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}