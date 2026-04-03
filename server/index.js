import 'dotenv/config';
import {server} from './app.js';
import connectDB from './src/config/Db.js';
import { connectSQL } from './src/config/sql.config.js';



const port = process.env.PORT || 5000;
console.log(process.env.PORT,"port");

const startServer = async () => {
  await connectDB();   
  await connectSQL()

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
