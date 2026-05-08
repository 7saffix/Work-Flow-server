import { z } from "zod";

export const createPurchaseZodSchema = z.object({
  product: z.string({ error: "Product is required" }),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),

  vat: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  shippingCost: z.number().min(0).default(0),
});
