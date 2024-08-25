import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { IGetProduct, IProduct } from "../../types";


export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getProducts: builder.query<IGetProduct, string | void>({
      query: (queries) => ({
        url: `/api/v1/products/get-products${queries}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getOneProduct: builder.query<IProduct, string | void>({
      query: (productId) => ({
        url: `/api/v1/products/get-one-product/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductsCategory: builder.query<IProduct[], string | void>({
      query: (categoryId) => ({
        url: `/api/v1/products/category-products/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

  }),
});

export const { useGetProductsQuery , useGetOneProductQuery , useGetProductsCategoryQuery} = productsApiSlice;
