import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middleware/errorMiddleware.js";
import authRoutes from './src/routes/user.routes.js';
import expenseRoutes from './src/routes/expense.routes.js'
import budgetRoutes from'./src/routes/budget.routes.js'
import dashboardRoutes from './src/routes/dashboard.routes.js'
import reportRoutes from './src/routes/report.routes.js';
const server = express();

// middleware
server.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true   // ✅ fixed
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/expenses", expenseRoutes);
server.use("/api/v1/budgets", budgetRoutes);
server.use("/api/v1/dashboard", dashboardRoutes);
server.use("/api/v1/reports", reportRoutes);
// test route
server.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ❗❗❗ ERROR MIDDLEWARE (ALWAYS LAST)
server.use(errorHandler);

export { server };