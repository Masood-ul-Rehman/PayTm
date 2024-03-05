import express from "express";
import { UserRoutes } from "./userRoutes";
import { FundsRoutes } from "./funds";
const router = express.Router();
router.use("/user", UserRoutes);
router.use("/funds", FundsRoutes);

export const rootRouter = router;
