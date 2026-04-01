import { api } from "./api";

export interface CartItem {
  _id: string;
  product: string;
  primaryImage: string;
  price: number;
  quantity: number;
  colors?: string[];
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  city: string;
  address: string;
  notes?: string;
}

export interface ApiOrder {
  _id: string;
  userInfo: UserInfo;
  shippingAddress: ShippingAddress;
  cartItems: CartItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface OrdersListResponse {
  status: string;
  results: number;
  pagination: {
    currentPage: number;
    limit: number;
    numberOfPages: number;
  };
  data: ApiOrder[];
}

export interface SingleOrderResponse {
  status: string;
  code: number;
  message: string;
  data: ApiOrder;
}

export interface UpdateOrderStatusPayload {
  id: string;
  orderStatus: string;
}

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersListResponse, void>({
      query: () => "/api/v1/orders",
      providesTags: ["Order"],
    }),
    getOrder: builder.query<SingleOrderResponse, string>({
      query: (id) => `/api/v1/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    updateOrderStatus: builder.mutation<any, UpdateOrderStatusPayload>({
      query: ({ id, orderStatus }) => ({
        url: `/api/v1/orders/${id}`,
        method: "PATCH",
        body: { orderStatus },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/v1/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
