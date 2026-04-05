
export const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="mb-4 text-left">
    {label && <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">{label}</label>}
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all shadow-sm bg-gray-50/50 appearance-none cursor-pointer"
      >
        <option value="">Select {label || 'Option'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Custom Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
);