"use client";
import { useEffect } from "react";
import useReport from "@/hooks/useReport";
import useDashboard from "@/hooks/useDashboard"; // MongoDB Stats ke liye
import { StatCard } from "@/components/reports/ReportCard";
import { ReportsTable } from "@/components/reports/ReportsTable";

export default function ReportsPage() {
  const { history, loading, fetchHistory, generateReport } = useReport();
  const { stats, loading: statsLoading } = useDashboard();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSync = async () => {
    const result = await generateReport();
    if (result.success) {
      alert("Bhai, SQL data sync ho gaya! ✅");
    } else {
      alert("Sync fail ho gaya: " + result.message);
    }
  };

  if (loading || statsLoading) return <div className="p-20 text-center font-bold">Data fetch ho raha hai...</div>;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter">Reports & Insights</h1>
        <button 
          onClick={handleSync}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
        >
          🔄 Sync Current Month
        </button>
      </div>

      {/* STATS FROM MONGODB */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Current Month Spent" value={`₹${stats?.totalSpent || 0}`} subtext="From MongoDB" />
        <StatCard title="Top Category" value={stats?.topCategory || "N/A"} subtext="Most expenses" />
        <StatCard 
          title="Last SQL Record" 
          value={history[0]?.monthYear || "No Data"} 
          subtext={history[0]?.overbudgetCategories === "None" ? "Budget: OK" : "Budget: Over!"}
          isAlert={history[0]?.overbudgetCategories !== "None"} 
        />
      </div>

      {/* HISTORY FROM SQL */}
      <ReportsTable history={history} />
    </div>
  );
}