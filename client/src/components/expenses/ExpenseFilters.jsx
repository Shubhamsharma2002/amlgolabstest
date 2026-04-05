export const ExpenseFilters = ({ 
  search, setSearch, 
  setFilterCategory, setFilterPayment, setFilterDate 
}) => (
  <div className="flex flex-wrap gap-3 items-center">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 rounded-xl bg-purple-500 text-white placeholder-purple-200 outline-none shadow-md"
    />

    <select
      onChange={(e) => setFilterCategory(e.target.value)}
      className="px-4 py-2 rounded-xl bg-blue-500 text-white outline-none cursor-pointer shadow-md"
    >
      <option value="">All Categories</option>
      <option value="Food">Food</option>
      <option value="Rent">Rent</option>
      <option value="Shopping">Shopping</option>
      <option value="Travel">Travel</option>
      <option value="Bills">Bills</option>
      <option value="Others">Others</option>
      
    </select>

    <select
      onChange={(e) => setFilterPayment(e.target.value)}
      className="px-4 py-2 rounded-xl bg-green-500 text-white outline-none cursor-pointer shadow-md"
    >
      <option value="">All Payments</option>
      <option value="UPI">UPI</option>
      <option value="Cash">Cash</option>
      <option value="Credit Card">Credit Card</option>
      <option value="Debit Card">Debit Card</option>
    </select>

    <input
      type="date"
      onChange={(e) => setFilterDate(e.target.value)}
      className="px-4 py-2 rounded-xl bg-gray-700 text-white outline-none shadow-md"
    />
  </div>
);