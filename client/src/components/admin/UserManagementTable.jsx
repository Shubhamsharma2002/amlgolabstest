export default function UserTable({ users, onDelete }) {
  return (
    <div className="bg-white rounded-b-lg shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase font-black tracking-widest">
          <tr>
            <th className="px-8 py-5">Platform User</th>
            <th className="px-8 py-5">Email Address</th>
            <th className="px-8 py-5">Total Expenditure</th>
            <th className="px-8 py-5 text-center">Manage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50/40 transition-colors group">
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user.fullname.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-700">{user.fullname}</span>
                </div>
              </td>
              <td className="px-8 py-5 text-gray-500 text-sm">{user.email}</td>
              <td className="px-8 py-5">
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                  ₹{user.totalSpent}
                </span>
              </td>
              <td className="px-8 py-5 text-center">
                <button 
                  onClick={() => onDelete(user._id)}
                  className="p-2.5 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}