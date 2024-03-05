import { Types } from "mongoose";
import Account from "../models/accountModel";
interface AccountType {
  userId: Types.ObjectId;
  balance: number;
}

export const findAccountById = async (
  userId: any
): Promise<AccountType | null> => {
  const account = await Account.findOne({ userId });
  if (!account) {
    return null;
  }

  const { userId: accountId, balance } = account.toObject();
  return { userId: accountId as Types.ObjectId, balance: balance as number };
};
