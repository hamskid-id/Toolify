import { z } from "zod";

export const ForgetpasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }) // Added email validation
    .min(8, { message: "Email must be at least 8 characters." })
});