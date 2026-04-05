"use client";

import { useRouter } from "next/navigation";
import { getUser, logoutUser } from "@/lib/auth";
import { logoutApi } from "@/lib/api";

export default function Topbar() {
  const router = useRouter();
  
  // 1. Direct user data nikalo (Server pe null milega, Client pe data)
  const user = getUser();
  const firstName = user?.fullname ? user.fullname.split(" ")[0] : "User";

  const handleLogout = async () => {
    try {
      await logoutApi(); 
      logoutUser(); 
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
      {/* 2. suppressHydrationWarning use karo taaki Next.js gussa na kare */}
      <h2 
        className="text-lg font-semibold text-gray-800" 
        suppressHydrationWarning
      >
        👋 Welcome, {firstName}
      </h2>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-200 border border-red-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}