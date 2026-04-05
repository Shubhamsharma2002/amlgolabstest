"use client";
import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/lib/api"; 

export const useAdmin = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalSpend: 0,
    usersList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Admin Stats & User List
  const fetchAdminStats = useCallback(async () => {
    try {
      setLoading(true);
     
      const res = await apiRequest("/admin/stats", "GET");
      
      if (res) {
        setData({
          totalUsers: res.totalUsers || 0,
          totalSpend: res.totalSpend || 0,
          usersList: res.usersList || [],
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Admin Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Delete User Function
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Hyy, seriously you deleting this user 🗑️"
    );

    if (!confirmDelete) return;

    try {
  
      await apiRequest(`/admin/user/${userId}`, "DELETE");
      
    
      alert("User deleted successfully! ✅");
      fetchAdminStats(); 
    } catch (err) {
      alert("Getting error to Delete : " + err.message);
    }
  };

  // 3. Initial Load
  useEffect(() => {
    fetchAdminStats();
  }, [fetchAdminStats]);

  return {
    data,
    loading,
    error,
    deleteUser,
    refreshData: fetchAdminStats, 
  };
};