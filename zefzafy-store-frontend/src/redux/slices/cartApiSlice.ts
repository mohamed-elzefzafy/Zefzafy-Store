import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { ICart } from "../../types";

export interface IAddToCart {
  quantity : number;
  productId : string,
}

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    addToCart : builder.mutation<ICart, IAddToCart>({
      query : (data) => ({
        url : `/api/v1/cart/add-cart/${data.productId}`,
        method : "POST",
        body : data,
      }),
  
    }),
    getUserCart: builder.query<ICart, string | void>({
      query: () => ({
        url: `/api/v1/cart/get-user-cart`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    deleteItemFromCart : builder.mutation<ICart, {productId : string}>({
      query : (data) => ({
        url : `/api/v1/cart/remove-product/${data.productId}`,
        method : "DELETE",
        body : data,
      }),

    }),

  })
})



export const {useAddToCartMutation , useGetUserCartQuery , useDeleteItemFromCartMutation } = cartApiSlice;