import { z } from "zod";

export const createBrandZodSchema = z.object({
  brandName: z
    .string({
      error: "Brand name is required",
    })
    .min(2, "Brand name must be at least 2 characters"),
});
