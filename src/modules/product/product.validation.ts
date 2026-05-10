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
  purchasePrice: z.number({
    error: "Purchase price is required",
  }),
  sellingPrice: z.number({
    error: "Selling price is required",
  }),
  stock: z.number({
    error: "Stock is required",
  }),
  description: z.string().optional(),
});

export const updateProductZodSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  name: z.string().optional(),
  purchasePrice: z.number().optional(),
  sellingPrice: z.number().optional(),
  stock: z.number().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});
