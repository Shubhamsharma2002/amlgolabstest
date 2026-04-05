import { InputField } from "../ui/Input";
import { SelectField } from "../ui/SelectField";

export const ExpenseModal = ({ isEdit, form, onChange, onSave, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
    <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "✏️ Edit Expense" : "💰 Add New Expense"}
      </h2>

      <div className="space-y-1">
        <InputField label="Amount" type="number" name="amount" value={form.amount} onChange={onChange} placeholder="Enter amount" />
        
        <SelectField 
          label="Category" name="category" value={form.category} onChange={onChange} 
          options={[
            { label: "Food 🍔", value: "Food" },
            { label: "Rent 🏠", value: "Rent" },
            { label: "Shopping 🛍️", value: "Shopping" },
            { label: "Travel 🛍️", value: "Travel" },
            { label: "Bills 🛍️", value: "Bills" },
             { label: "Others 🛍️", value: "Others" }
            
          ]} 
        />

        <InputField label="Date" type="date" name="date" value={form.date} onChange={onChange} />
        
        <SelectField 
          label="Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={onChange} 
          options={[
            { label: "UPI", value: "UPI" },
            { label: "Cash", value: "Cash" },
            { label: "Credit Card", value: "Credit Card" },
             { label: "Debit Card", value: "Debit Card" }
          ]} 
        />

        <InputField label="Notes" name="notes" value={form.notes} onChange={onChange} placeholder="Any specific note?" />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={onClose} className="px-5 py-2 font-semibold text-gray-500 hover:bg-gray-100 rounded-xl transition">
          Cancel
        </button>
        <button onClick={onSave} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
          {isEdit ? "Update" : "Save Expense"}
        </button>
      </div>
    </div>
  </div>
);