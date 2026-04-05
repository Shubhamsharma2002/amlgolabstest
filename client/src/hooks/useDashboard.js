// src/hooks/useDashboard.js
import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/lib/api";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      // Endpoint correct kiya: /dashboard/stats
      const response = await apiRequest("/dashboard/stats", "GET");
      setStats(response.data); // Backend ApiResponse structure handle kiya
    } catch (err) {
      console.error("Dashboard fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refresh: fetchStats };
}