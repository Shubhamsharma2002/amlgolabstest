"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {
  const path = usePathname();
  const { user } = useAuth(); // Yahan se role milega

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Expenses", path: "/expenses", icon: "💸" },
    { name: "Budgets", path: "/budgets", icon: "📈" },
    { name: "Reports", path: "/reports", icon: "📁" },
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-md p-4 w-64"> 

      {/* Logo */}
      <h1 className="text-2xl font-extrabold mb-8 px-2 text-blue-600 italic">
        💰 FinanceApp
      </h1>

      {/* Main Menu */}
      <div className="flex-1 space-y-1">
        {menu.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition-all ${
                path === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
          </Link>
        ))}

        {/* 👑 Admin Specific Section */}
        {user?.role === "admin" && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase px-3 mb-2 tracking-widest">
              Admin Control
            </p>
            <Link href="/admin">
              <div
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  path === "/admin"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-purple-500 hover:bg-purple-50"
                }`}
              >
                <span>👑</span>
                <span className="font-bold">User Manager</span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* User Profile Summary (Optional Bottom Section) */}
      <div className="mt-auto p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
          {user?.fullname?.charAt(0) || "U"}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold truncate">{user?.fullname}</p>
          <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}