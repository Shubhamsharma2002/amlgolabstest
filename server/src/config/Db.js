import { Sequelize } from 'sequelize';

let sequelize;

try {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Ye file Render automatically create kar lega
    logging: false,
  });
  console.log("✅ SQL Config Loaded");
} catch (err) {
  console.error("❌ SQL Config Error:", err.message);
  sequelize = null; 
}

// Ye function index.js mein call ho raha hai, ise safe rakho
export const connectSQL = async () => {
  try {
    if (sequelize) {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('✅ SQLite Connected & Synced');
    }
  } catch (error) {
    console.error('⚠️ SQL Auth/Sync Failed:', error.message);
  }
};

export default sequelize;