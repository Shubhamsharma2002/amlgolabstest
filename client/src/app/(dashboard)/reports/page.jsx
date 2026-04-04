"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "@/components/reports/ReportCard";
import AISuggestion from "@/components/ui/AISuggestion";
import { ReportsTable } from "@/components/reports/ReportsTable";


export default function ReportsPage() {
  const [data, setData] = useState({ dashboard: null, history: [], suggestions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [stats, history] = await Promise.all([
             axios.get(""),
            axios.get("")
        ]);
        setData({
          dashboard: stats.data.data,
          history: history.data.data,
          suggestions: [] // Abhi Task 5 baki hai bhai!
        });
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-indigo-600 animate-pulse">Bhai, data aa raha hai...</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">REPORTS & <span className="text-indigo-600">INSIGHTS</span></h1>

      <AISuggestion suggestions={data.suggestions} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Monthly Spent" 
          value={`₹${data.dashboard?.totalSpent || 0}`} 
          subtext="Current Month Data" 
        />
        <StatCard 
          title="Top Category" 
          value={data.dashboard?.topCategory || "N/A"} 
          subtext="Max kharcha yahan hua" 
        />
        <StatCard 
          title="Budget Status" 
          value={data.history[0]?.overbudgetCategories === "None" ? "On Track" : "Alert"} 
          subtext={data.history[0]?.overbudgetCategories}
          isAlert={data.history[0]?.overbudgetCategories !== "None"}
        />
      </div>

      <ReportsTable history={data.history} />
    </div>
  );
}