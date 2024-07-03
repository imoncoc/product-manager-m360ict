import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (options) => {
        const params = new URLSearchParams();
        if (options.limit) {
          params.append("limit", options.limit);
          // console.log("limit: ", options.limit);
        }
        if (options.skip) {
          params.append("skip", options.skip);
          // console.log("skip: ", options.skip);
        }

        return {
          url: `/products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["products"],
    }),
    getProductDetails: builder.query({
      query: (id) => {
        // const params = new URLSearchParams();
        // if (priority) {
        //   params.append("priority", priority);
        // }
        return {
          url: `/product/${id}`,
          method: "GET",
          //   params: params,
        };
      },
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `/products/categories`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: (options) => ({
        url: `/products/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategoriesQuery,
  useUpdateProductMutation,
} = baseApi;
