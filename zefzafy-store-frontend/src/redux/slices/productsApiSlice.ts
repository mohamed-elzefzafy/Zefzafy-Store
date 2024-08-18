import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { pagination, Product } from "../../types";

interface IGetProduct {
  products : Product[];
  pagination : pagination
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getProducts: builder.query<IGetProduct, void>({
      query: () => ({
        url: `/api/v1/products/get-products`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;