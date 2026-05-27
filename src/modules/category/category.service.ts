import AppError from "../../errorHelper/AppError";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory) => {
  const isExist = await Category.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(400, "Category already exists");
  }
  const result = await Category.create(payload);
  return result;
};

const getAllCategories = async () => {
  return await Category.find();
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
};
