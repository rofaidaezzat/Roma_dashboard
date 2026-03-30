export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface CartItem {
  _id: string;
  product: string;
  primaryImage: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    city: string;
    address: string;
    notes?: string;
  };
  cartItems: CartItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}
