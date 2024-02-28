import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Types } from "mongoose";

const emailSchema = z.string().email();

export const getUserByEmail = async (email: string) => {
  const validatedEmail = emailSchema.parse(email);
  const user = await User.findOne({ email: validatedEmail });
  return { user };
};
export const signToken = (userId: Types.ObjectId) =>
  (() => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );
  })();
export const verifyToken = (token: string) =>
  (() => {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  })();
