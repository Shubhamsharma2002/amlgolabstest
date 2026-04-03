"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expenses", path: "/expenses" },
    { name: "Budgets", path: "/budgets" },
    { name: "Reports", path: "/reports" },
    {name: "Log out", path:"/logout"}
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">💰 Finance</h1>

      {menu.map((item) => (
        <Link key={item.path} href={item.path}>
          <div
            className={`p-3 rounded-lg mb-2 cursor-pointer ${
              path === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
}