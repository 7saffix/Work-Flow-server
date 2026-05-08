import { Types } from "mongoose";

export interface ICustomer {
  user: Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive?: boolean;
}
