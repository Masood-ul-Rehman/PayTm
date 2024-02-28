import express from "express";
import { createNewUser, signin } from "../controlers/user";
const router = express.Router();
router.post("/create", createNewUser);
router.post("/signin", signin);
export const UserRoutes = router;
