import { Request, Response } from "express";
import { signinBody, signupBody } from "../schemas/user";
import { getUserByEmail, signToken } from "../lib/user";
import User from "../models/userModel";
import { Types } from "mongoose";
export const createNewUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const { success } = signupBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Please provide all fields in correct format",
    });
  const existingUser = await getUserByEmail(email);
  if (existingUser.user?.email) {
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
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const success = signinBody.safeParse(req.body);
  if (!success)
    return res.status(411).json({
      message: "Please provide all fields in correct format",
    });
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return res.status(411).json({
      message: "No user found with this email",
    });
  }
  if (existingUser.user?.password !== password) {
    return res.status(411).json({
      message: "Password is incorrect",
    });
  } else {
    const userId: Types.ObjectId | undefined = existingUser.user?._id;
    const token = userId && signToken(userId);
    res.json({
      token: token,
      message: "Login successfull",
    });
  }
};
