import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { ICart, IProduct } from "../../types";

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
      // invalidatesTags : ["Reviews"]
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



    // updateReview : builder.mutation<IProduct, IReiews>({
    //   query : (data) => ({
    //     url : `/api/v1/reviews/update-review/${data.productId}?reviewId=${data.reviewId}`,
    //     method : "PUT",
    //     body : data,
    //   }), 
    //   invalidatesTags : ["Reviews"]
    // }),
    // deleteReview : builder.mutation({
    //   query : (data) => ({
    //     url : `/api/v1/reviews/remove-review/${data.productId}?reviewId=${data.reviewId}`,
    //     method : "PUT",
    //   }),
    //   invalidatesTags : ["Reviews"]
    // }),
    // deleteReviewByAdmin : builder.mutation({
    //   query : (data) => ({
    //     url : `/api/v1/reviews/admin-remove-review/${data.productId}?reviewId=${data.reviewId}`,
    //     method : "PUT",
    //   }),
    //   invalidatesTags : ["Reviews"]
    // }),
  })
})



export const {useAddToCartMutation , useGetUserCartQuery , useDeleteItemFromCartMutation } = cartApiSlice;