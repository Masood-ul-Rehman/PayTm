import z from "zod";

export const signupBody = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export const signinBody = z.object({
  email: z.string().email(),
  password: z.string(),
});
