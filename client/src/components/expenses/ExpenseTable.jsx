import { SquarePen, Trash2 } from "lucide-react";

export const ExpenseTable = ({ data, onDelete, onEdit }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
    <table className="w-full text-left">
      <thead className="bg-gray-50 text-gray-600 font-semibold">
        <tr>
          <th className="p-4">Date</th>
          <th className="p-4">Category</th>
          <th className="p-4">Amount</th>
          <th className="p-4">Payment</th>
          <th className="p-4">Notes</th>
          <th className="p-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
  {data.map((item) => (
    // 🔥 Yahan 'item.id' ki jagah 'item._id' karo
    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
      <td className="p-4 text-sm">{item.date?.split('T')[0]}</td>
      <td className="p-4 text-sm font-medium">{item.category}</td>
            <td className="p-4 text-sm font-bold text-gray-900">₹{item.amount}</td>
            <td className="p-4 text-sm">
               <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold">{item.paymentMethod}</span>
            </td>
            <td className="p-4 text-sm text-gray-500">{item.notes || "-"}</td>
            <td className="p-4">
              <div className="flex justify-center gap-4">
                <button onClick={() => onDelete(item._id)} className="text-red-500 hover:scale-110 transition">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => onEdit(item._id)} className="text-blue-500 hover:scale-110 transition">
                  <SquarePen size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);