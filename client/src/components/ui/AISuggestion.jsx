export default function AISuggestion({ suggestions = [] }) {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg mb-8 transition-all hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl animate-bounce">✨</span>
        <h2 className="text-xl font-bold italic">AI Financial Coach</h2>
      </div>
      
      <ul className="space-y-3 opacity-90 text-sm md:text-base">
        {suggestions.length > 0 ? (
          suggestions.map((s, i) => (
            <li key={i} className="flex gap-3 items-start bg-white/10 p-2 rounded-lg">
              <span className="text-yellow-300">💡</span> 
              <span>{s}</span>
            </li>
          ))
        ) : (
          <div className="flex flex-col gap-2">
             <li className="text-indigo-100 italic">No suggestions yet...</li>
             <p className="text-xs text-indigo-200">Tip: Add more expenses from the last 30 days to get AI insights.</p>
          </div>
        )}
      </ul>
    </div>
  );
}