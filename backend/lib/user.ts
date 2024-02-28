import { z } from "zod";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Types } from "mongoose";
import { updateUserBody } from "../schemas/userSchema";

const emailSchema = z.string().email();

export const getUserByEmail = async (email: string) => {
  const validatedEmail = emailSchema.parse(email);
  const user = await User.findOne({ email: validatedEmail });
  return { user };
};
export const getUserById = async (id: string) => {
  const user = await User.findOne({ _id: id });
  return user;
};
export const updateUserById = async (
  uId: string,
  firstName: string,
  lastName: string,
  password: string
) => {
  const validated = updateUserBody.parse({
    firstName,
    lastName,
    password,
  });
  const updateObject: { [key: string]: any } = {};

  if (validated.firstName) {
    updateObject.firstName = validated.firstName;
  }

  if (validated.lastName) {
    updateObject.lastName = validated.lastName;
  }

  if (validated.password) {
    updateObject.password = validated.password;
  }

  if (Object.keys(updateObject).length === 0) {
    throw new Error("No valid fields to update");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: uId },
    { $set: updateObject },
    { new: true }
  );

  return updatedUser;
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
