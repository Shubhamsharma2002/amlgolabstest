import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.URI; // Ya process.env.MONGO_URI
    if (!uri) {
      throw new Error("MongoDB URI is missing in Environment Variables!");
    }

    console.log("Attempting to connect to MongoDB...");
    
    const connection = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(`Error Details: ${error.message}`);
    // Process exit mat karna varna Render baar-baar restart karega
  }
};

export default connectDB;