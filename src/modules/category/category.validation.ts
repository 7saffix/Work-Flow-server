import { z } from "zod";

export const createCategoryZodSchema = z.object({
  name: z.string({ error: "Name is required" }),
  isActive: z.boolean().optional(),
});

export const updateCategoryZodSchema = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
});
