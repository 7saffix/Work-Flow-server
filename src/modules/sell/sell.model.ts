import { Schema, model } from "mongoose";
import { ISell } from "./sell.interface";

const sellSchema = new Schema<ISell>(
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
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
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

export const Sell = model<ISell>("Sell", sellSchema);
