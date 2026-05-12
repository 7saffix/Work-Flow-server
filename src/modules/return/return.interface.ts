import { Types } from "mongoose";

export interface IReturn {
  user: Types.ObjectId;

  sell: Types.ObjectId;

  product: Types.ObjectId;
  customer: Types.ObjectId;

  quantity: number;
  unitPrice: number;

  vat: number;
  discount: number;

  totalPrice: number;
}
