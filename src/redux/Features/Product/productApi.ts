/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, { keyword?: string; category?: string; page?: number; limit?: number }>({
  query: ({ keyword = "", category = "", page = 1, limit = 5 }) => {
    const params = new URLSearchParams();
    
    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category);
    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    
    const queryString = params.toString();
    const url = queryString ? `/product?${queryString}` : "/product";
    
    return {
      url,
      method: "GET",
      credentials: "include",
    };
  },
  providesTags: ["product"],
}),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["product"],
    }),

    addProduct: builder.mutation<any, any>({
      query: (data) => ({
        url: `/product/add`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation<any, any>({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
