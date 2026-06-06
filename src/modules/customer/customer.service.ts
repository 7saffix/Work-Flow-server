import AppError from "../../errorHelper/AppError";
import { ICustomer } from "./customer.interface";
import { Customer } from "./customer.model";

const createCustomer = async (userId: string, payload: ICustomer) => {
  const customer = await Customer.create({
    ...payload,
    user: userId,
  });

  return customer;
};

const getAllCustomers = async (userId: string) => {
  return await Customer.find({ user: userId }).populate("user");
};

const updateCustomer = async (id: string, payload: Partial<ICustomer>) => {
  const customer = await Customer.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  });

  if (!customer) {
    throw new AppError(404, "Customer not found");
  }

  return customer;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
};
