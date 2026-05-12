import mongoose from "mongoose";
import { Return } from "./return.model";
import { Product } from "../product/product.model";
import AppError from "../../errorHelper/AppError";
import { Sell } from "../sell/sell.model";

const createReturn = async (payload: any, userId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { sell, quantity } = payload;

    // find original sell
    const sellExist = await Sell.findById(sell);

    if (!sellExist) {
      throw new AppError(404, "Sell not found");
    }

    // prevent over return
    const previousReturnedQuantity = await Return.aggregate([
      {
        $match: {
          sell: sellExist._id,
        },
      },
      {
        $group: {
          _id: "$sell",
          totalReturned: {
            $sum: "$quantity",
          },
        },
      },
    ]);

    const alreadyReturned = previousReturnedQuantity[0]?.totalReturned || 0;

    const remainingQuantity = sellExist.quantity - alreadyReturned;

    if (quantity > remainingQuantity) {
      throw new AppError(
        400,
        `You can return maximum ${remainingQuantity} item(s)`,
      );
    }

    // take original sell snapshot price
    const unitPrice = Number(sellExist.unitPrice);
    const vat = Number(sellExist.vat);
    const discount = Number(sellExist.discount);

    const basePrice = quantity * unitPrice;

    const totalPrice = basePrice + vat - discount;

    // create return record
    const result = await Return.create(
      [
        {
          user: userId,

          sell: sellExist._id,

          product: sellExist.product,
          customer: sellExist.customer,

          quantity,

          unitPrice,

          vat,
          discount,

          totalPrice,
        },
      ],
      { session },
    );

    // restore stock
    await Product.findByIdAndUpdate(
      sellExist.product,
      {
        $inc: {
          stock: quantity,
        },
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

const getMyAllReturn = async (userId: string) => {
  return await Return.find({ user: userId }).populate("product", "name price");
};

export const ReturnService = {
  createReturn,
  getMyAllReturn,
};
