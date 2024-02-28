import { Request, Response } from "express";

export const createNewUser = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;
  res.status(400);
};
