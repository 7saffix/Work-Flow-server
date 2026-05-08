import { Schema, model } from "mongoose";
import { IReturn } from "./return.interface";

const ReturnSchema = new Schema<IReturn>(
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
      ref: "Product",
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

export const Return = model<IReturn>("Return", ReturnSchema);
