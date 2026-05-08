import { Types } from "mongoose";

export interface IReturn {
  user: Types.ObjectId;
  product: Types.ObjectId;
  customer: Types.ObjectId;
  quantity: number;
  unitPrice: number;

  vat: number;
  discount: number;
  shippingCost: number;

  totalPrice: number;
}
