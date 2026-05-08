import { z } from "zod";

export const createProductZodSchema = z.object({
  category: z.string({
    error: "Category is required",
  }),
  brand: z.string({
    error: "Brand is required",
  }),
  name: z.string({
    error: "Product name is required",
  }),
  description: z.string().optional(),
});

export const updateProductZodSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
