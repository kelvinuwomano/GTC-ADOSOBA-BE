import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to database")
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};
export default database;
