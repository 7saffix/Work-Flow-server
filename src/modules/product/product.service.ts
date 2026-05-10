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

const getAllProducts = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const category = query.category;
  const brand = query.brand;
  const sort = query.sort || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  const matchStage: any = {};

  if (category) matchStage.category = category;
  if (brand) matchStage.brand = brand;

  if (search) {
    matchStage.name = {
      $regex: search,
      $options: "i",
    };
  }

  const result = await Product.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },

    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    { $unwind: "$brand" },

    {
      $project: {
        name: 1,
        purchasePrice: 1,
        sellingPrice: 1,
        stock: 1,
        category: "$category.name",
        brand: "$brand.name",
      },
    },

    { $sort: { [sort]: order } },
    { $skip: skip },
    { $limit: limit },
  ]);

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
