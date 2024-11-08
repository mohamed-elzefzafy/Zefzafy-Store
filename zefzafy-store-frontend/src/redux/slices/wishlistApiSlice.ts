import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import {  IProduct, IUserInfo, IWishlist } from "../../types";

// export interface IReiews {

//     comment : string,
//     rating : number,
//     productId : string,
//     reviewId? : string,

// }
export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    toggleWishlist : builder.mutation<IUserInfo, {productId : string}>({
      query : ({productId}) => ({
        url : `/api/v1/wishlist/add-wishlist/${productId}`,
        method : "PUT",
      }),
      // invalidatesTags : ["Reviews"]
    }),

    getLoggedUserWishlist :builder.query<IProduct[],string | void>({
      query : () => ({
        url : `/api/v1/wishlist/add-wishlist/logged-user`,
      }),
      // invalidatesTags : ["Reviews"]
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



export const {useToggleWishlistMutation , useGetLoggedUserWishlistQuery} = wishlistApiSlice;