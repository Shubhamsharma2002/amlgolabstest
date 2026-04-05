"use client";
import CategoryPie from "@/components/dashboard/CategoryPie";
import SpendingChart from "@/components/dashboard/SpendingChart";
import SummaryCard from "@/components/dashboard/SummaryCards";
import AISuggestion from "@/components/ui/AISuggestion";
import useDashboard from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading) return <div className="p-10 text-center font-bold text-purple-600">Wait, data is loading... 🚀</div>;

  return (
    <div className="p-6 space-y-6 bg-[#F5F7FB] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Spent (This Month)"
          value={`₹${stats?.totalSpent || 0}`}
          gradient="bg-gradient-to-r from-[#7C3AED] to-[#6366F1]"
        />
        <SummaryCard
          title="Top Category"
          value={stats?.topCategory || "N/A"}
          gradient="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
        />
        <SummaryCard
          title="Top Payment Method"
          value={stats?.topPayments[0]?._id || "N/A"}
          gradient="bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendingChart data={stats?.timeStats} />
        <CategoryPie data={stats?.categoryStats} />
      </div>

      <AISuggestion data={stats} />
    </div>
  );
}