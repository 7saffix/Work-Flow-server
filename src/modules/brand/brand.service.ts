import { Brand } from "./brand.model";
import { IBrand } from "./brand.interface";
import AppError from "../../errorHelper/AppError";

const createBrand = async (payload: IBrand) => {
  const isExist = await Brand.findOne({ name: payload.brandName });
  if (isExist) {
    throw new AppError(400, "Brand already exists");
  }
  const result = await Brand.create(payload);
  return result;
};

const getAllBrands = async () => {
  return await Brand.find({}, { brandName: 1, _id: 1 });
};

const updateBrand = async (id: string, payload: Partial<IBrand>) => {
  return await Brand.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const BrandService = {
  createBrand,
  getAllBrands,
  updateBrand,
};
