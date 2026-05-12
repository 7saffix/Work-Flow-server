import mongoose from "mongoose";
import { Sell } from "./sell.model";
import { Product } from "../product/product.model";
import AppError from "../../errorHelper/AppError";

const createSell = async (payload: any, userId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { product, customer, quantity, vat, discount, shippingCost } =
      payload;
    console.log(payload);

    const productExist = await Product.findById(product);
    if (!productExist) throw new AppError(404, "product not found");

    if (productExist.stock < quantity) {
      throw new AppError(400, "Insufficient stock");
    }
    const unitPrice = Number(productExist.sellingPrice);
    console.log(unitPrice);

    const basePrice = quantity * unitPrice;

    const totalPrice = basePrice + vat + shippingCost - discount;

    const result = await Sell.create(
      [
        {
          user: userId,
          product,
          customer,
          quantity,
          unitPrice,
          vat,
          discount,
          shippingCost,
          totalPrice,
        },
      ],
      { session },
    );

    await Product.findByIdAndUpdate(
      product,
      {
        $inc: { stock: -quantity },
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMyAllSells = async (userId: string) => {
  return await Sell.find({ user: userId }).populate("product", "name price");
};

export const SellService = {
  createSell,
  getMyAllSells,
};
