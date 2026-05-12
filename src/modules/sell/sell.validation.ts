import { z } from "zod";

export const createSellZodSchema = z.object({
  product: z.string({ error: "Product is required" }),
  customer: z.string({ error: "customer is required" }),
  quantity: z.number().min(1),
  vat: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  shippingCost: z.number().min(0).default(0),
});
