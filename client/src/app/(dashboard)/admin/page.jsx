"use client";
import StatCard from '@/components/admin/AdminStats';
import UserTable from '@/components/admin/UserManagementTable';
import { useAdmin } from '@/hooks/useAdmin';
import React from 'react';

export default function AdminPage() {
  const { data, loading, deleteUser } = useAdmin();

  if (loading) return <div className="p-10 text-center font-bold">Admin Data Load ho raha hai... 🚀</div>;

  return (
    <div className="p-8 bg-[#F8F9FC] min-h-screen space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Control 👑</h1>
          <p className="text-gray-500 text-sm mt-1">Platform level insights aur user management.</p>
        </div>
        

      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Total Platform Users" 
          value={data.totalUsers} 
          icon="👥" 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Total Platform Spending" 
          value={`₹${data.totalSpend.toLocaleString()}`} 
          icon="💰" 
          color="bg-emerald-500" 
        />
      </div>

      {/* 3. Detailed User Table */}
      <div className="pt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Active Users</h2>
        <UserTable users={data.usersList} onDelete={deleteUser} />
      </div>
    </div>
  );
}