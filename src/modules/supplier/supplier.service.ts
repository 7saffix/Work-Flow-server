import AppError from "../../errorHelper/AppError";
import { ISupplier } from "./supplier.interface";
import { Supplier } from "./supplier.model";

const createSupplier = async (userId: string, payload: ISupplier) => {
  const supplier = await Supplier.create({
    ...payload,
    user: userId,
  });

  return supplier;
};

const getAllSuppliers = async () => {
  return await Supplier.find().populate("user");
};

const updateSupplier = async (id: string, payload: Partial<ISupplier>) => {
  const supplier = await Supplier.findByIdAndUpdate(id, payload, { new: true });

  if (!supplier) {
    throw new AppError(404, "Supplier not found");
  }

  return supplier;
};

export const SupplierService = {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
};
