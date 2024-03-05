import z from "zod";
import { checkUserId } from "./globalScema";
export const transferSchema = z.object({
  to: checkUserId,
  amount: z.number(),
});
