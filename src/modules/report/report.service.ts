import { Types } from "mongoose";
import { Expense } from "../expense/expense.model";
import { Product } from "../product/product.model";
import { Purchase } from "../purchase/purchase.model";
import { Sell } from "../sell/sell.model";
import { Customer } from "../customer/customer.model";
import AppError from "../../errorHelper/AppError";

const buildDateFilter = (query: any) => {
  const filter: any = {};

  if (query.from || query.to) {
    filter.createdAt = {};

    if (query.from) {
      filter.createdAt.$gte = new Date(`${query.from}T00:00:00.000Z`);
    }

    if (query.to) {
      filter.createdAt.$lte = new Date(`${query.to}T23:59:59.999Z`);
    }
  }

  return filter;
};

const getDashboardSummary = async (userId: string) => {
  const userObjectId = new Types.ObjectId(userId);
  const [totalPurchases, totalExpenses, totalProducts] = await Promise.all([
    Purchase.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalPrice",
          },
        },
      },
    ]),

    Expense.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    Product.countDocuments({
      user: userId,
    }),
  ]);

  const salesAnalytics = await Sell.aggregate([
    {
      $match: {
        user: userObjectId,
      },
    },

    {
      $facet: {
        ThirtyDaysSales: [
          {
            $match: {
              createdAt: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$totalPrice" },
              avgOrderValue: { $avg: "$totalPrice" },
            },
          },
        ],

        dailyTrend: [
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lte: new Date(),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              sales: { $sum: "$totalPrice" },
            },
          },
          { $sort: { _id: 1 } },
        ],

        topProducts: [
          {
            $group: {
              _id: "$product",
              qty: { $sum: "$quantity" },
              revenue: { $sum: "$totalPrice" },
            },
          },
          {
            $sort: { revenue: -1 },
          },
          {
            $limit: 5,
          },
        ],
      },
    },
  ]);

  const totalSalesAmount = salesAnalytics[0]?.ThirtyDaysSales[0]?.total || 0;
  const avgOrderValue =
    salesAnalytics[0]?.ThirtyDaysSales[0]?.avgOrderValue || 0;
  const todaySales = salesAnalytics[0]?.dailyTrend[0]?.sales || 0;
  const bestSelling = salesAnalytics[0]?.topProducts;

  const totalPurchaseAmount = totalPurchases[0]?.total || 0;

  const totalExpenseAmount = totalExpenses[0]?.total || 0;

  return {
    totalSales: totalSalesAmount,
    avgOrderValue,
    todaySales,
    bestSelling,
    totalPurchases: totalPurchaseAmount,
    totalExpenses: totalExpenseAmount,
    totalProducts,
  };
};

const getSalesReport = async (userId: string, query: any) => {
  const userObjectId = new Types.ObjectId(userId);
  const dateFilter = buildDateFilter(query);

  const result = await Sell.aggregate([
    {
      $match: {
        user: userObjectId,
        ...dateFilter,
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
        totalDiscount: {
          $sum: "$discount",
        },
        totalVat: {
          $sum: "$vat",
        },
        totalShipping: {
          $sum: "$shippingCost",
        },
        totalOrders: {
          $sum: 1,
        },
        totalQuantity: {
          $sum: "$quantity",
        },
      },
    },
  ]);

  return result[0] || {};
};

const getPurchaseReport = async (userId: string, query: any) => {
  const userObjectId = new Types.ObjectId(userId);

  const dateFilter = buildDateFilter(query);

  const matchStage: any = {
    user: userObjectId,
    ...dateFilter,
  };

  const report = await Purchase.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null,
        totalPurchases: { $sum: 1 },
        totalAmount: { $sum: "$totalPrice" },
        totalQuantity: { $sum: "$quantity" },
      },
    },
  ]);

  return (
    report[0] || {
      totalPurchases: 0,
      totalAmount: 0,
      totalQuantity: 0,
    }
  );
};

const getInventoryReport = async (userId: string) => {
  const products = await Product.find({
    user: userId,
  })
    .populate("category")
    .populate("brand")
    .lean();

  const totalInventoryValue = products.reduce((acc, item: any) => {
    return acc + item.stock * item.purchasePrice;
  }, 0);

  const lowStockProducts = products.filter((item: any) => item.stock <= 5);

  const outOfStockProducts = products.filter((item: any) => item.stock <= 0);

  return {
    totalInventoryValue,
    totalProducts: products.length,
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    products,
  };
};

const getExpenseReport = async (userId: string, query: any) => {
  const userObjectId = new Types.ObjectId(userId);
  const dateFilter = buildDateFilter(query);

  const result = await Expense.aggregate([
    {
      $match: {
        user: userObjectId,
        ...dateFilter,
      },
    },
    {
      $group: {
        _id: "$expenseType",
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  return result;
};

export const getCustomerReport = async (userId: string, query: any) => {
  const matchStage: any = {
    user: new Types.ObjectId(userId),
  };
  if (!query.customerId) {
    throw new AppError(400, "customerId is required");
  }

  matchStage.customer = new Types.ObjectId(query.customerId);

  const result = await Sell.aggregate([
    { $match: matchStage },

    {
      $group: {
        _id: "$customer",
        totalAmount: { $sum: "$totalPrice" },
        totalQuantity: { $sum: "$quantity" },
        totalOrders: { $sum: 1 },
        lastPurchase: { $max: "$createdAt" },
      },
    },

    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customer",
      },
    },

    { $unwind: "$customer" },

    {
      $project: {
        customerName: "$customer.name",
        totalAmount: 1,
        totalQuantity: 1,
        totalOrders: 1,
        lastPurchase: 1,
      },
    },
  ]);

  return result;
};

export const getSupplierReport = async (userId: string, query: any) => {
  const matchStage: any = {
    user: new Types.ObjectId(userId),
  };

  if (!query.supplierId) {
    throw new AppError(400, "Supplier is required");
  }

  matchStage.supplier = new Types.ObjectId(query.supplierId);

  const result = await Purchase.aggregate([
    { $match: matchStage },

    {
      $group: {
        _id: "$supplier",
        totalCost: { $sum: "$totalPrice" },
        totalQuantity: { $sum: "$quantity" },
        totalPurchases: { $sum: 1 },
        lastPurchase: { $max: "$createdAt" },
      },
    },

    {
      $lookup: {
        from: "suppliers",
        localField: "_id",
        foreignField: "_id",
        as: "supplier",
      },
    },

    { $unwind: "$supplier" },

    {
      $project: {
        supplierName: "$supplier.name",
        address: "$supplier.address",
        totalCost: 1,
        totalQuantity: 1,
        totalPurchases: 1,
        lastPurchase: 1,
      },
    },
  ]);

  return result;
};

export const ReportService = {
  getDashboardSummary,
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getExpenseReport,
  getCustomerReport,
  getSupplierReport,
};
