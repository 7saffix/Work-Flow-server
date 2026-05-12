import { z } from "zod";

export const createReturnZodSchema = z.object({
  sell: z.string({ error: "Sell is required" }),
  quantity: z.number().min(1),

  vat: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
});
