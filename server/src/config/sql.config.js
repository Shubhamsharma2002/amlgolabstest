import { Sequelize, DataTypes } from "sequelize";
import path from "path";

// 📂 database.sqlite file server root mein create hogi
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(process.cwd(), "database.sqlite"),
    logging: false, // Console saaf rakhne ke liye
});

// 📊 Report Model (Point 44)
const MonthlyReport = sequelize.define("MonthlyReport", {
    userId: { type: DataTypes.STRING, allowNull: false },
    monthYear: { type: DataTypes.STRING, allowNull: false }, // e.g. "April 2026"
    totalSpent: { type: DataTypes.FLOAT, defaultValue: 0 },
    topCategory: { type: DataTypes.STRING },
    overbudgetCategories: { type: DataTypes.TEXT }, // Stringified array ya comma separated
});

// Sync Database (Table create karega agar nahi hai toh)
const connectSQL = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("✅ SQL (SQLite) connected & synced.");
    } catch (error) {
        console.error("❌ SQL Connection Error:", error);
    }
};

export { sequelize, MonthlyReport, connectSQL };