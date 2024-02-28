import { Request, Response } from "express";
import { signupUser } from "../schemas/user";
import { getUserByEmail, signToken } from "../lib/user";
import User from "../models/userModel";
import { Types } from "mongoose";
export const createNewUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const { success } = signupUser.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Please provide fields in correct format",
    });
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    console.log(existingUser);
    return res.status(411).json({
      message: "This email is already associated with an existing user",
    });
  }
  const newUser = await User.create({
    email,
    password,
    firstName,
    lastName,
  });
  const userId: Types.ObjectId = newUser._id;

  const token = signToken(userId);

  res.json({
    message: "User created successfully",
    token: token,
  });
};
