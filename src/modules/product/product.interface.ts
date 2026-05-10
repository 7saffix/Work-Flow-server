import { Types } from "mongoose";

export interface IProduct {
  user: Types.ObjectId;
  category: Types.ObjectId;
  brand: Types.ObjectId;

  name: string;
  purchasePrice: number;
  sellingPrice: Number;
  stock: Number;

  description?: string;
  isActive?: boolean;
}
