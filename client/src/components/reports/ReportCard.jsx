export const StatCard = ({ title, value, subtext, isAlert }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${isAlert ? 'text-red-600' : 'text-gray-800'}`}>
        {value}
      </h3>
    </div>
    {subtext && <p className={`text-xs mt-2 font-medium ${isAlert ? 'text-gray-400 italic' : 'text-green-500'}`}>{subtext}</p>}
  </div>
);