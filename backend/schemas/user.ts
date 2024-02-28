import z from "zod";

export const signupUser = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export type SignupUserType = z.infer<typeof signupUser>;
