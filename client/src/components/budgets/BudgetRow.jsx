export default function BudgetRow({ item }) {
  return (
    <tr className="border-t">
      <td className="p-3 font-medium">
        {item.category || "N/A"} 
      </td>

      <td>₹{item.limit}</td>
      <td>₹{item.spent}</td>

      <td
        className={
          item.status.includes("Exceeded")
            ? "text-red-500"
            : item.status.includes("80%")
            ? "text-yellow-500"
            : "text-green-500"
        }
      >
        {item.status}
      </td>
    </tr>
  );
}