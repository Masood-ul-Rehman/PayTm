import mongoose from "mongoose";
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("Mongo Url is not defined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db is conected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
