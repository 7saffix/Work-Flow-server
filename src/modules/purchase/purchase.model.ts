import { Schema, model } from "mongoose";
import { IPurchase } from "./purchase.interface";

const purchaseSchema = new Schema<IPurchase>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },

    vat: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },

    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Purchase = model<IPurchase>("Purchase", purchaseSchema);
