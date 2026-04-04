export default function AISuggestion({ suggestions = [] }) {
  
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg mb-8">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl animate-bounce">✨</span>
      <h2 className="text-xl font-bold italic">AI Financial Coach</h2>
    </div>
    <ul className="space-y-3 opacity-90 text-sm md:text-base">
      {suggestions.length > 0 ? (
        suggestions.map((s, i) => <li key={i} className="flex gap-2"><span>•</span> {s}</li>)
      ) : (
        <li className=" text-indigo-100 italic">Bhai, abhi data analyze ho raha hai...</li>
      )}
    </ul>
  </div>
  );
}