import { User } from "../models/user.model.js";
import { Expense } from "../models/expense.model.js"; 

export const getAdminDashboardData = async (req, res, next) => {
  try {
    // Check if requester is Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    // 1. Total Users (excluding admins)
    const totalUsers = await User.countDocuments({ role: "user" });

    // 2. Total Spend (All users combined)
    const totalSpendData = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalSpend = totalSpendData.length > 0 ? totalSpendData[0].total : 0;

    // 3. All Users List for the table
    const usersList = await User.aggregate([
      { $match: { role: "user" } },
      {
        $lookup: {
          from: "expenses", 
          localField: "_id",
          foreignField: "owner",
          as: "expenses"
        }
      },
      {
        $project: {
          fullname: 1,
          email: 1,
          totalSpent: { $sum: "$expenses.amount" }
        }
      }
    ]);

    res.status(200).json({ totalUsers, totalSpend, usersList });
  } catch (error) {
    next(error);
  }
};

// Delete User Logic
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  // Optional: Delete user's expenses too
  await Expense.deleteMany({ owner: id });
  res.status(200).json({ message: "User deleted successfully" });
};