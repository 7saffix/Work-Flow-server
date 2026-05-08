import { Return } from "./return.model";

const createReturn = async (payload: any, userId: string) => {
  const {
    product,
    customer,
    quantity,
    unitPrice,
    vat,
    discount,
    shippingCost,
  } = payload;

  const basePrice = quantity * unitPrice;

  const totalPrice = basePrice + vat + shippingCost - discount;

  const result = await Return.create({
    user: userId,
    product,
    customer,
    quantity,
    unitPrice,
    vat,
    discount,
    shippingCost,
    totalPrice,
  });

  return result;
};

const getMyAllReturn = async (userId: string) => {
  return await Return.find({ user: userId }).populate("product", "name price");
};

export const ReturnService = {
  createReturn,
  getMyAllReturn,
};
