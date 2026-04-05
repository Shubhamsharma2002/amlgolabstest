import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";

export default function useReport() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch History (GET)
  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiRequest("/reports/history", "GET");
      setHistory(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Generate New Report (POST)
  const generateReport = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("/reports/generate", "POST");
      // Report generate hone ke baad history refresh kar do
      await fetchHistory(); 
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { history, loading, error, fetchHistory, generateReport };
}