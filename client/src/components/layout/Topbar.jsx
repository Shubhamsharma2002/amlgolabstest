"use client";

import { useRouter } from "next/navigation";
import { getUser, logoutUser } from "@/lib/auth";
import { logoutApi } from "@/lib/api";

export default function Topbar() {
  const router = useRouter();
  const user = getUser();

  const firstName = user?.fullname?.split(" ")[0];

  const handleLogout = async () => {
    await logoutApi(); // optional
    logoutUser(); // 🔥 main kaam

    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">

      <h2 className="text-lg font-semibold">
        👋 Welcome, {firstName || "User"}
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
}