import { api } from "./api";

export interface StatsOverview {
  totalRevenue: number;
  last7DaysRevenue: number;
  totalOrders: number;
  ordersToday: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface SalesDay {
  revenue: number;
  date: string;
}

export interface TopProduct {
  _id: string;
  sold: number;
  revenue: number;
  name: string;
}

export interface RecentOrder {
  _id: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalOrderPrice: number;
  orderStatus: string;
  createdAt: string;
}

export interface StatsResponse {
  status: string;
  code: number;
  message: string;
  data: {
    overview: StatsOverview;
    charts: {
      salesLast30Days: SalesDay[];
    };
    topProducts: TopProduct[];
    recentOrders: RecentOrder[];
  };
}

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<StatsResponse, void>({
      query: () => "/api/v1/stats",
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
