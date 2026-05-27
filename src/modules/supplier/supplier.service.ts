import AppError from "../../errorHelper/AppError";
import { ISupplier } from "./supplier.interface";
import { Supplier } from "./supplier.model";

const createSupplier = async (userId: string, payload: ISupplier) => {
  const isExist = await Supplier.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(400, "Supplier already exists");
  }
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
