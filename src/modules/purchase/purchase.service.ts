import mongoose from "mongoose";
import { Purchase } from "./purchase.model";
import { Product } from "../product/product.model";
import AppError from "../../errorHelper/AppError";

const createPurchase = async (payload: any, userId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const {
      product,
      supplier,
      quantity,
      unitPrice,
      vat,
      discount,
      shippingCost,
    } = payload;

    const productExist = await Product.findById(product);

    if (!productExist) {
      throw new AppError(404, "Product not found");
    }

    const basePrice = quantity * unitPrice;

    const totalPrice = basePrice + vat + shippingCost - discount;

    const purchase = await Purchase.create(
      [
        {
          user: userId,
          product,
          supplier,
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

    const avgPurchasePrice =
      (productExist.stock * productExist.purchasePrice + quantity * unitPrice) /
      (productExist.stock + quantity);

    await Product.findByIdAndUpdate(
      product,
      {
        $inc: { stock: quantity },
        purchasePrice: avgPurchasePrice,
      },
      { session },
    );
    await session.commitTransaction();
    session.endSession();

    const result = await Purchase.findById(purchase[0]._id)
      .populate("product", "name")
      .populate("supplier", "name");

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMyAllPurchases = async (userId: string) => {
  return await Purchase.find({ user: userId }).populate(
    "product",
    "name price",
  );
};

export const PurchaseService = {
  createPurchase,
  getMyAllPurchases,
};
