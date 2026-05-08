import { Purchase } from "./purchase.model";

const createPurchase = async (payload: any, userId: string) => {
  const { product, quantity, unitPrice, vat, discount, shippingCost } = payload;

  const basePrice = quantity * unitPrice;

  const totalPrice = basePrice + vat + shippingCost - discount;

  const result = await Purchase.create({
    user: userId,
    product,
    quantity,
    unitPrice,
    vat,
    discount,
    shippingCost,
    totalPrice,
  });

  return result;
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
