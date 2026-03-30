export type StockStatus = "In Stock" | "Out of Stock";

export interface Product {
  _id: string; // The backend ID
  name: string;
  price: number;
  description: string;
  primaryImage: string;
  images: string[];
  category: string;
  sections: string[];
  collections: string[];
  stock: number;
  materials: string[];
  notes: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v?: number;

  // Transient/derived fields for UI logic (mapped in component)
  id: string;
  productId: string;
  image: string;
  quantity: number;
  stockStatus: StockStatus;
  dateAdded: Date;
}
