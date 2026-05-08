import AppError from "../../errorHelper/AppError";
import { Product } from "./product.model";
import { IProduct } from "./product.interface";

const createProduct = async (userId: string, payload: Partial<IProduct>) => {
  const isExist = await Product.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(400, "Product already exists");
  }

  const result = await Product.create({
    ...payload,
    user: userId,
  });

  return result;
};

const getAllProducts = async () => {
  const result = await Product.find()
    .populate("user")
    .populate("category")
    .populate("brand");

  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!result) {
    throw new AppError(404, "Product not found");
  }

  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  updateProduct,
};
