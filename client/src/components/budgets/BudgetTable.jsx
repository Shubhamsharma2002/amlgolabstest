import BudgetRow from "./BudgetRow";

export default function BudgetTable({ budgets }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Category</th>
            <th>Limit</th>
            <th>Spent</th>
            <th>Status</th>
          </tr>
        </thead>

<tbody>
  {budgets.map((item, index) => (
    <BudgetRow 
      key={item.category + index}  
      item={item} 
    />
  ))}
</tbody>
      </table>
    </div>
  );
}