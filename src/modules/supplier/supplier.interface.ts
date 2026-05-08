import { Types } from "mongoose";

export interface ISupplier {
  user: Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive?: boolean;
}
