import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../lib/user";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "unauthorized, You are not allowed to perform this action",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token) as jwt.JwtPayload;
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
