"use client";

import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 500,
      category: "Food",
      date: "2026-04-01",
      payment: "UPI",
      notes: "Lunch",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    payment: "",
    notes: "",
  });

  // 🔍 Search + Filters
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add + Edit
  const handleSave = () => {
    if (isEdit) {
      const updated = expenses.map((item) =>
        item.id === editId ? { ...item, ...form } : item
      );
      setExpenses(updated);
      setIsEdit(false);
      setEditId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        ...form,
      };
      setExpenses([...expenses, newExpense]);
    }

    setShowModal(false);
    setForm({ amount: "", category: "", date: "", payment: "", notes: "" });
  };

  // Delete
  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  // Edit
  const handleEdit = (id) => {
    const selected = expenses.find((item) => item.id === id);
    setForm(selected);
    setEditId(id);
    setIsEdit(true);
    setShowModal(true);
  };

  // 🔥 Filter + Search Logic
  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.payment.toLowerCase().includes(search.toLowerCase()) ||
      item.notes?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = filterCategory
      ? item.category === filterCategory
      : true;

    const matchesPayment = filterPayment
      ? item.payment === filterPayment
      : true;

    const matchesDate = filterDate ? item.date === filterDate : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPayment &&
      matchesDate
    );
  });

  return (
    <div className="space-y-6">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expenses</h1>

        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setForm({
              amount: "",
              category: "",
              date: "",
              payment: "",
              notes: "",
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      </div>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 rounded-xl bg-purple-500 text-white outline-none"
        />

        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white outline-none"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
        </select>

        <select
          onChange={(e) => setFilterPayment(e.target.value)}
          className="px-4 py-2 rounded-xl bg-green-500 text-white outline-none"
        >
          <option value="">All Payments</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>

        <input
          type="date"
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 rounded-xl bg-gray-700 text-white outline-none"
        />
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Notes</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.date}</td>
                <td>{item.category}</td>
                <td>₹{item.amount}</td>
                <td>{item.payment}</td>
                <td>{item.notes}</td>

                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <Trash2 size={20} />
                    </button>

                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-500 hover:scale-110 transition"
                    >
                      <SquarePen size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Expense" : "Add Expense"}
            </h2>

            <input
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="payment"
              placeholder="Payment Method"
              value={form.payment}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="notes"
              placeholder="Notes (optional)"
              value={form.notes}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}