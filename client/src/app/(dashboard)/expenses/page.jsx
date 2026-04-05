"use client";

import { useState, useEffect } from "react";
import useExpense from "@/hooks/useExpenses"; // Hook import kiya
import { ExpenseFilters } from "@/components/expenses/ExpenseFilters";
import { ExpenseModal } from "@/components/expenses/ExpenseModal";
import { ExpenseTable } from "@/components/expenses/ExpenseTable";

export default function ExpensesPage() {
  // 1.  CUSTOM HOOK STATES
  const { 
    expenses, 
    loading, 
    fetchExpenses, 
    addExpense, 
    updateExpense, 
    deleteExpense 
  } = useExpense();

  // 2.  UI STATES
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // 3.  FORM STATE
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    paymentMethod: "", // Backend key match ki
    notes: "",
  });

  // 4.  FILTER STATES
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // ---  API CALLING LOGIC ---

  // Jab bhi filters badlega, backend se fresh data aayega
  useEffect(() => {
    fetchExpenses({ 
      search, 
      filterCategory, 
      filterPayment, 
      filterDate 
    });
  }, [search, filterCategory, filterPayment, filterDate, fetchExpenses]);

  // ---  HANDLERS ---

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validation
    if (!form.amount || !form.category || !form.date || !form.paymentMethod) {
      console.log("Missing fields in form:", form);
      alert("Listen, All fields are required! ❗");
      
      return;
    }

    let result;
    if (isEdit) {
      result = await updateExpense(editId, form);
    } else {
      result = await addExpense(form);
    }

    if (result.success) {
      setShowModal(false);
      setForm({ amount: "", category: "", date: "", paymentMethod: "", notes: "" });
      fetchExpenses({ search, filterCategory, filterPayment, filterDate }); // Data refresh
    } else {
      alert(result.message || "Kuch gadbad ho gayi!");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (confirm("Kya sach mein delete karna hai?")) {
      const result = await deleteExpense(id);
      if (!result.success) alert("Delete nahi ho paya!");
    }
  };

const handleEditClick = (id) => {
  const selected = expenses.find((item) => item._id === id); 
  
  //  Safety Check: Agar 'selected' nahi mila toh function yahi rok do
  if (!selected) {
    console.error("Bhai, expense nahi mila ID se:", id);
    return;
  }

  setForm({
    amount: selected.amount || "",
    category: selected.category || "",
    // Date fix: Agar date hai toh split karo, varna empty string
    date: selected.date ? selected.date.split('T')[0] : "", 
    paymentMethod: selected.paymentMethod || "",
    notes: selected.notes || "",
  });
  
  setEditId(id);
  setIsEdit(true);
  setShowModal(true);
};

  return (
    <div className="p-2 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Expenses</h1>
          <p className="text-gray-500 text-sm font-medium italic">Track Your All, Expenses 💰</p>
        </div>
        <button 
          onClick={() => { 
            setShowModal(true); 
            setIsEdit(false); 
            setForm({ amount: "", category: "", date: "", paymentMethod: "", notes: "" });
          }} 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        >
          + Add Expense
        </button>
      </div>

      {/* FILTERS COMPONENT */}
      <ExpenseFilters 
        search={search} 
        setSearch={setSearch}
        setFilterCategory={setFilterCategory}
        setFilterPayment={setFilterPayment}
        setFilterDate={setFilterDate}
      />

      {/* TABLE COMPONENT */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500 font-bold italic">Wait data is loading !</p>
        </div>
      ) : (
        <ExpenseTable 
          data={expenses} 
          onDelete={handleDeleteExpense} 
          onEdit={handleEditClick} 
        />
      )}

      {/* NO DATA STATE */}
      {!loading && expenses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-medium">list is empaty add new data or check the filter🔍</p>
        </div>
      )}

      {/* MODAL COMPONENT */}
      {showModal && (
        <ExpenseModal 
          isEdit={isEdit} 
          form={form} 
          onChange={handleChange} 
          onSave={handleSave} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}