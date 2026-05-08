import { z } from "zod";

export const createCustomerZodSchema = z.object({
  name: z.string({ error: "Name is required" }),
  address: z.string({ error: "Address is required" }),
  phone: z.string({ error: "Phone is required" }),
  email: z.email({ error: "Email is required" }),
});

export const updateCustomerZodSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.email().optional(),
  isActive: z.boolean().optional(),
});
