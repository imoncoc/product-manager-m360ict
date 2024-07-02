import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        // const params = new URLSearchParams();
        // if (priority) {
        //   params.append("priority", priority);
        // }
        return {
          url: `/products`,
          method: "GET",
          //   params: params,
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
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = baseApi;
