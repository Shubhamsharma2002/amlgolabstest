"use client";

import { useState } from "react";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food", limit: 5000, spent: 4200 },
    { id: 2, category: "Travel", limit: 3000, spent: 3500 },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    category: "",
    limit: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBudget = () => {
    const newBudget = {
      id: Date.now(),
      category: form.category,
      limit: Number(form.limit),
      spent: 0,
    };

    setBudgets([...budgets, newBudget]);
    setShowModal(false);
    setForm({ category: "", limit: "" });
  };

  const getStatus = (spent, limit) => {
    const percent = (spent / limit) * 100;

    if (percent >= 100) return { text: "Over Budget 🚨", color: "text-red-500" };
    if (percent >= 80) return { text: "80% Reached ⚠️", color: "text-yellow-500" };
    return { text: "Safe ✅", color: "text-green-500" };
  };

  return (
    <div className="space-y-6">

      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budgets</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Budget
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Category</th>
              <th>Limit</th>
              <th>Spent</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {budgets.map((item) => {
              const status = getStatus(item.spent, item.limit);

              return (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.category}</td>
                  <td>₹{item.limit}</td>
                  <td>₹{item.spent}</td>
                  <td className={status.color}>{status.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-lg font-bold mb-4">Add Budget</h2>

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="limit"
              placeholder="Limit"
              value={form.limit}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                onClick={handleAddBudget}
                className="bg-purple-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}