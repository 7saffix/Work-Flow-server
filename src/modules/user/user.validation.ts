import { z } from "zod";

export const createUserZodSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters"),
  email: z.email({ error: "Enter a valid email" }),

  phone: z.string({ error: "Phone number is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  image: z.string().optional(),
});
