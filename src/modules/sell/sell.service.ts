import { Sell } from "./sell.model";

const createSell = async (payload: any, userId: string) => {
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

  const result = await Sell.create({
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

const getMyAllSells = async (userId: string) => {
  return await Sell.find({ user: userId }).populate("product", "name price");
};

export const SellService = {
  createSell,
  getMyAllSells,
};
