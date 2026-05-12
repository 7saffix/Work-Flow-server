import { Types } from "mongoose";
import { Expense } from "../expense/expense.model";
import { Product } from "../product/product.model";
import { Purchase } from "../purchase/purchase.model";
import { Sell } from "../sell/sell.model";

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
          user: new Types.ObjectId(userId),
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
            $group: {
              _id: null,
              total: { $sum: "$totalPrice" },
              avgOrderValue: { $avg: "$totalPrice" },
            },
          },
        ],

        dailyTrend: [
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

export const ReportService = { getDashboardSummary };
