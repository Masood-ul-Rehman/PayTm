import express from "express";
import { createNewUser } from "../controlers/user";
const router = express.Router();
router.post("/create", createNewUser);
export const UserRoutes = router;
