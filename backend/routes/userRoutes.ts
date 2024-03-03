import express from "express";
import {
  createNewUser,
  getBulkUsers,
  signin,
  updateUser,
} from "../controlers/userControler";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();
router.post("/create", createNewUser);
router.post("/signin", signin);
router.put("/update:id", authMiddleware, updateUser);
router.get("/bulk", authMiddleware, getBulkUsers);
export const UserRoutes = router;
