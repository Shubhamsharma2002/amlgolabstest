import 'dotenv/config';
import { server } from './app.js';
import connectDB from './src/config/Db.js';
import { connectSQL } from './src/config/sql.config.js';

const port = process.env.PORT || 10000; // Render usually uses 10000
console.log("Starting server on port:", port);

const startServer = async () => {
  try {
    // 1. Pehle MongoDB connect karo (Ye zaroori hai)
    await connectDB();
    console.log("✅ MongoDB Connection Sequence Completed");

    // 2. SQL connect karo (Try-Catch mein taaki server crash na ho)
    try {
      await connectSQL();
      console.log("✅ SQL Connection Successful");
    } catch (sqlError) {
      console.error("⚠️ SQL Connection Failed (But server will still start):", sqlError.message);
    }

    // 3. Server ko start karo (Ye loop se bahar hona chahiye taaki fail hone par bhi chale)
    server.listen(port, () => {
      console.log(`🚀 Server is officially running on port ${port}`);
    });

  } catch (globalError) {
    console.error("❌ Critical Error during startup:", globalError.message);
    // Agar MongoDB fail ho jaye toh shayad hi server chale, par listen yahan bhi dal sakte ho
    server.listen(port); 
  }
};

startServer();