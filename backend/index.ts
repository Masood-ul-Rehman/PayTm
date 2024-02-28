import express from "express";
import cors from "cors";
import { rootRouter } from "./routes/index";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", rootRouter);

app.listen(4000, () => {
  console.log("running on 4000");
});
