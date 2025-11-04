import mongoose from "mongoose";
import dotenv from "dotenv";

// config .env

dotenv.config();

// stablissing DB connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection successfully stablish")
  } catch (err) {
    console.error("Connection failed" , err.message);
    process.exit(1);
  }
}

export default connectDB