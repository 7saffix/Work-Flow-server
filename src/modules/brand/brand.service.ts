import { Brand } from "./brand.model";
import { IBrand } from "./brand.interface";

const createBrand = async (payload: IBrand) => {
  const result = await Brand.create(payload);
  return result;
};

const getAllBrands = async () => {
  return await Brand.find({}, { brandName: 1, _id: 0 });
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
