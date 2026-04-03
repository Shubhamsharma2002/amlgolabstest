"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 400 },
  { name: "Travel", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Other", value: 200 },
];

const COLORS = ["#6C63FF", "#00C49F", "#FFBB28", "#FF8042"];

export default function CategoryPie() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Category Breakdown</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}