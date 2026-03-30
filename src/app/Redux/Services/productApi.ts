import { api } from "./api";

export interface Product {
  _id: string;
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
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  code: number;
  message: string;
  results: number;
  pagination: any;
  data: Product[];
}

export interface SingleProductResponse {
  status: string;
  code: number;
  message: string;
  data: Product;
}

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/api/v1/products",
      providesTags: ["Product"],
    }),
    getProduct: builder.query<SingleProductResponse, string>({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<{ status: string; data: Product }, FormData>({
      query: (formData) => ({
        url: "/api/v1/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      { status: string; data: Product },
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/api/v1/products/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Product",
        { type: "Product", id },
      ],
    }),
    deleteProduct: builder.mutation<{ status: string }, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
