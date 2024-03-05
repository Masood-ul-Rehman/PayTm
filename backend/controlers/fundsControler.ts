import { Response, Request } from "express";
import Account from "../models/accountModel";
import { checkUserId } from "../schemas/globalScema";
import { findAccountById } from "../lib/account";
import mongoose from "mongoose";
export const getBalance = async (req: Request, res: Response) => {
  const userId = req.body.id;
  const { success } = checkUserId.safeParse(userId);
  if (!success)
    return res.json({
      message: "No user found with this Id",
    });
  const account = await findAccountById({ userId });
  if (!account) {
    return res.json({
      message: "No account found with this Id",
    });
  }
  res.json({
    balance: account?.balance,
  });
};
export const transferFunds = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  const { success } = checkUserId.safeParse(req.body);
  if (!success)
    return res.json({
      message: "No proper data",
    });
  const account = await findAccountById(req.userId);
  if (!account) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Account not found",
    });
  }

  if (account.balance < amount) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  } else {
    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    );
  }
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
};
