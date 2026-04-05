export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform hover:scale-[1.02]">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-800">{value}</h3>
      </div>
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner text-white`}>
        {icon}
      </div>
    </div>
  );
}