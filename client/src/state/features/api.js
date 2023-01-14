import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminApi",
  // api call to the backend server
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  tagTypes: ["User", "Products", "Customers"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      provideTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  apiSlice;
