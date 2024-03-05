import z, { ZodSchema } from "zod";

const isMongoId = (value: string) => {
  // Check if the value is a valid MongoDB ObjectId
  return typeof value === "string" && /^[0-9a-fA-F]{24}$/.test(value);
};

export const checkUserId: ZodSchema = z.object({
  id: z.string().refine(isMongoId, {
    message: "id should be a valid MongoDB ObjectId",
  }),
});
