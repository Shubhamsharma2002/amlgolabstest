"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6C63FF", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export default function CategoryPie({ data = [] }) {
  const pieData = data.map(item => ({
    name: item._id, 
    value: item.total
  }));

  if (!pieData.length) return <div className="p-10 text-center italic text-gray-400">No data available</div>;

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold text-gray-700">Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={pieData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            innerRadius={0} 
            outerRadius={80} 
            stroke="white" 
            strokeWidth={2}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius + 25; 
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text 
                  x={x} 
                  y={y} 
                  fill={COLORS[index % COLORS.length]} 
                  textAnchor={x > cx ? 'start' : 'end'} 
                  dominantBaseline="central"
                  className="text-xs font-bold" 
                >
                  ₹{value}
                </text>
              );
            }}
            labelLine={true} 
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}