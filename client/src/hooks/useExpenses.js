import { useState, useCallback } from "react";
import { apiRequest } from "@/lib/api"; // Tumhari apiRequest utility ka path

export default function useExpense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. FETCH ALL (With Backend Filters)
  const fetchExpenses = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Query params ko backend ke hisaab se map kar rahe hain
      // Backend expects: category, paymentMethod, date, search
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.filterCategory) queryParams.append("category", filters.filterCategory);
      if (filters.filterPayment) queryParams.append("paymentMethod", filters.filterPayment);
      if (filters.filterDate) queryParams.append("date", filters.filterDate);

      const endpoint = `/expenses?${queryParams.toString()}`;
      const response = await apiRequest(endpoint, "GET");

      setExpenses(response.data); // Backend ApiResponse structure: { data: [...] }
    } catch (err) {
      setError(err.message || "Bhai, data nahi aa paya!");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2.  ADD NEW EXPENSE
  const addExpense = async (formData) => {
    try {
      setLoading(true);
      // Backend expects: { amount, category, paymentMethod, date, notes }
      await apiRequest("/expenses", "POST", formData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // 3.  UPDATE EXPENSE
  const updateExpense = async (id, formData) => {
    try {
      setLoading(true);
      await apiRequest(`/expenses/${id}`, "PATCH", formData);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // 4.  DELETE EXPENSE
  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      await apiRequest(`/expenses/${id}`, "DELETE");
      
      
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}