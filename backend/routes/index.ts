import express from "express";
import { UserRoutes } from "./userRoutes";
const router = express.Router();
router.use("/user", UserRoutes);
export const rootRouter = router;
