import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.URI);
    
    const connection = await mongoose.connect(process.env.URI);

    console.log(`MongoDB Connected : ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed ");
    console.error(error.message);

    
  }
};

export default connectDB;