export const ReportsTable = ({ history }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-5 border-b bg-gray-50">
      <h2 className="font-bold text-gray-700 uppercase text-sm tracking-widest">Past 3 Months History (SQL)</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th className="p-4 font-bold">Month</th>
            <th className="p-4 font-bold">Total Spent</th>
            <th className="p-4 font-bold text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {history.map((report) => (
            <tr key={report.id} className="border-t hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium">{report.monthYear}</td>
              <td className="p-4 font-bold text-indigo-600">₹{report.totalSpent}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter ${
                  report.overbudgetCategories === "None" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {report.overbudgetCategories === "None" ? "ON TRACK" : "OVERBUDGET"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);