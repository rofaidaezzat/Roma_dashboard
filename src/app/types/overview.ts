export type OrderStatus = "Pending" | "Completed" | "Canceled";

export interface ProductStat {
  id: string;
  name: string;
  unitsSold: number;
  revenue: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: OrderStatus;
  date: string;
  products: OrderItem[];
}

export interface Kpi {
  label: string;
  value: string;
  trend: string;
}
