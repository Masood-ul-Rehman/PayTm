import mongoose from "mongoose";
const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";
  try {
    const conn = await mongoose.connect(uri);
    console.log("conected");
  } catch (error) {
    process.exit(1);
  }
};
module.exports = connectDB;
