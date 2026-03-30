import type { Kpi, Order, ProductStat } from "../types/overview";

export const kpis: Kpi[] = [
  { label: "Total Revenue (7 Days)", value: "EGP 48,350", trend: "+14.2% vs last week" },
  { label: "Orders", value: "126", trend: "+9 new today" },
  { label: "Products", value: "74", trend: "12 collections live" },
  { label: "Customers", value: "89", trend: "+18 this month" }
];

export const sales30Days = [8, 9, 11, 10, 13, 12, 14, 16, 15, 18, 17, 19, 21, 20, 22, 24, 23, 25, 24, 27, 26, 28, 29, 30, 28, 31, 32, 33, 34, 35];

export const topProducts: ProductStat[] = [
  { id: "p1", name: "Palm Weave Basket", unitsSold: 24, revenue: 8160 },
  { id: "p2", name: "Linen Tote Bag", unitsSold: 19, revenue: 5510 },
  { id: "p3", name: "Ceramic Candle Cup", unitsSold: 14, revenue: 4200 }
];

export const recentOrders: Order[] = [
  {
    id: "#BR-1092",
    customerName: "Nour Hany",
    email: "nour.hany@email.com",
    total: 1240,
    status: "Pending",
    date: "24 Mar 2026",
    products: [{ name: "Palm Weave Basket", quantity: 2, price: 340 }]
  },
  {
    id: "#BR-1091",
    customerName: "Marina Adel",
    email: "marina.adel@email.com",
    total: 890,
    status: "Completed",
    date: "24 Mar 2026",
    products: [{ name: "Linen Tote Bag", quantity: 2, price: 290 }]
  },
  {
    id: "#BR-1088",
    customerName: "Youssef Magdy",
    email: "youssef.magdy@email.com",
    total: 1760,
    status: "Completed",
    date: "23 Mar 2026",
    products: [{ name: "Wooden Serving Tray", quantity: 3, price: 390 }]
  },
  {
    id: "#BR-1086",
    customerName: "Sara Samir",
    email: "sara.samir@email.com",
    total: 640,
    status: "Pending",
    date: "23 Mar 2026",
    products: [{ name: "Aromatherapy Candle", quantity: 2, price: 220 }]
  }
];
