"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const [reports] = useState([
    {
      id: 1,
      month: "April 2026",
      total: 25000,
      topCategory: "Food",
      overBudget: ["Travel"],
    },
    {
      id: 2,
      month: "March 2026",
      total: 18000,
      topCategory: "Rent",
      overBudget: [],
    },
    {
      id: 3,
      month: "February 2026",
      total: 22000,
      topCategory: "Shopping",
      overBudget: ["Food"],
    },
  ]);

  const [selected, setSelected] = useState(reports[0]);

  // 🔹 Chart Data
  const chartData = reports.map((r) => ({
    month: r.month,
    total: r.total,
  }));

  return (
    <div className="space-y-6">

      {/* 🔹 Header */}
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* 🔹 Month Selector */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <span className="font-medium">{selected.month}</span>

        <select
          className="border px-3 py-1 rounded"
          onChange={(e) => {
            const report = reports.find(
              (r) => r.id == e.target.value
            );
            setSelected(report);
          }}
        >
          {reports.map((r) => (
            <option key={r.id} value={r.id}>
              {r.month}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Spent</h3>
          <p className="text-2xl font-bold mt-2">
            ₹{selected.total}
          </p>
        </div>

        {/* Top Category */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Top Category</h3>
          <p className="text-2xl font-bold mt-2">
            {selected.topCategory}
          </p>
        </div>

        {/* Over Budget */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Over Budget</h3>

          {selected.overBudget.length > 0 ? (
            <p className="text-red-500 font-bold mt-2">
              {selected.overBudget.join(", ")}
            </p>
          ) : (
            <p className="text-green-500 font-bold mt-2">
              None ✅
            </p>
          )}
        </div>

      </div>

      {/* 🔹 Bar Chart */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">
          Monthly Spending Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Month</th>
              <th>Total</th>
              <th>Top Category</th>
              <th>Over Budget</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.month}</td>
                <td>₹{r.total}</td>
                <td>{r.topCategory}</td>
                <td className="text-red-500">
                  {r.overBudget.length > 0
                    ? r.overBudget.join(", ")
                    : "None"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}