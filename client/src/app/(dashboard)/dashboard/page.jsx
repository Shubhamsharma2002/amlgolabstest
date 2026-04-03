import SummaryCard from "@/components/dashboard/SummaryCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import CategoryPie from "@/components/dashboard/CategoryPie";
import AISuggestion from "@/components/dashboard/AISuggestion";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F5F7FB] min-h-screen">

      {/* 🔹 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <SummaryCard
          title="Total Spent"
          value="₹25,000"
          gradient="bg-gradient-to-r from-[#7C3AED] to-[#6366F1]"
        />

        <SummaryCard
          title="Top Category"
          value="Food 🍔"
          gradient="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
        />

        <SummaryCard
          title="Top Payment"
          value="UPI 💳"
          gradient="bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
        

      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendingChart />
        <CategoryPie />
      </div>

      {/* 🔹 AI */}
      <AISuggestion />

    </div>
  );
}