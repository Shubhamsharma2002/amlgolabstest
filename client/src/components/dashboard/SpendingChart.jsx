"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "10 Apr", amount: 500 },
  { date: "11 Apr", amount: 1200 },
  { date: "12 Apr", amount: 900 },
  { date: "13 Apr", amount: 1500 },
  { date: "14 Apr", amount: 1300 },
];

export default function SpendingChart() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Spending Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6C63FF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}