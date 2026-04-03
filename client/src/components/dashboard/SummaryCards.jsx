export default function SummaryCard({ title, value, gradient }) {
  return (
    <div className={`${gradient} text-white p-5 rounded-2xl shadow`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}