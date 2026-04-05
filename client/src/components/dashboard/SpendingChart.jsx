"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function SpendingChart({ data = [] }) {
  // Backend data mapping (keep same)
  const chartData = data.map(item => ({
    date: item._id, // Format: YYYY-MM-DD
    amount: item.amount
  }));

  if (!chartData.length) return <div className="p-10 text-center italic text-gray-400">No spending data this month</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="mb-5 font-bold text-gray-800 text-lg tracking-tight">Spending Trend</h3>
      
      <ResponsiveContainer width="100%" height={280}>
        {/* 🔥 YAHAN FIX HAI: LineChart ki jagah AreaChart use kiya */}
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          
          {/* 🔥 GRADIENT SHADOW DEFINE: Ye SVG define karega shadow kaisa dikhega */}
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4}/> {/* Top colorful */}
              <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}/> {/* Bottom fades to transparent */}
            </linearGradient>
          </defs>
          
          {/* Halki horizontal lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
          
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => {
              const date = new Date(str);
              return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
            }}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            interval={0} // Har date dikhaye
          />
          
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${value > 999 ? value/1000 + 'k' : value}`}
          />
          
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            labelFormatter={(str) => {
                const date = new Date(str);
                return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
            }}
            formatter={(value) => [`₹${value.toLocaleString()}`, "Spent"]}
          />
          
          {/* 🔥 AREA: Ye graph line aur shadow ko draw karega */}
          <Area 
            type="monotone" // Smooth curve
            dataKey="amount" 
            stroke="#6C63FF" // Line color
            strokeWidth={3} 
            fillOpacity={1} // Important: defs wale gradient ko use karega
            fill="url(#colorAmount)" // gradient id reference ki
            dot={{ r: 6, strokeWidth: 3, fill: 'white', stroke: '#6C63FF' }} // White dots
            activeDot={{ r: 8 }} 
          />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}