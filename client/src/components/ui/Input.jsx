
export const InputField = ({ label, type = "text", name, value, onChange, placeholder, icon }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-3 text-gray-400">{icon}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-200 ${icon ? 'pl-10' : 'px-4'} py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all shadow-sm bg-gray-50/50`}
        required
      />
    </div>
  </div>
);