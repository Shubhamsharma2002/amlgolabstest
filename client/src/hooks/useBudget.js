import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function useBudget() {
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    const res = await apiRequest("/budgets/alerts", "GET");
    setBudgets(res.data);
  };

  const addBudget = async (data) => {
    const now = new Date();

    const payload = {
      category: data.category,
      amount: data.amount,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    };

    console.log("Sending:", payload); 

    await apiRequest("/budgets/set", "POST", payload);

   await fetchBudgets();
  };

  return { budgets, fetchBudgets, addBudget };
}