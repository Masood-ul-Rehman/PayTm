import express from "express";
import { getBalance, transferFunds } from "../controlers/fundsControler";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();
router.post("/transfer", authMiddleware, transferFunds);
router.get("/balance", authMiddleware, getBalance);
export const FundsRoutes = router;
