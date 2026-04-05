"use client";

import { useEffect, useState } from "react";

import useBudget from "@/hooks/useBudget";
import BudgetTable from "@/components/budgets/BudgetTable";
import BudgetModal from "@/components/budgets/BudgetModal";

export default function BudgetPage() {
  const { budgets, fetchBudgets, addBudget } = useBudget();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: "", limit: "" });

  useEffect(() => {
    fetchBudgets(); 
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleAddBudget = async () => {
  const now = new Date();

  const payload = {
    category: form.category.trim(),
    amount: Number(form.limit), 
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  console.log("Payload:", payload); // debug

  await addBudget(payload);

  setShowModal(false);
  setForm({ category: "", limit: "" });
};

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budgets</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Budget
        </button>
      </div>

      <BudgetTable budgets={budgets} />

      {showModal && (
        <BudgetModal
          form={form}
          handleChange={handleChange}
          onSave={handleAddBudget}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}