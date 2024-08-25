import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { IProduct } from "../../types";

export interface IReiews {

    comment : string,
    rating : number,
    productId : string,
    reviewId? : string,

}
export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    createReview : builder.mutation<IProduct, IReiews>({
      query : (data) => ({
        url : `/api/v1/reviews/create-review/${data.productId}`,
        method : "PUT",
        body : data,
      }),
      // invalidatesTags : ["Reviews"]
    }),
    updateReview : builder.mutation<IProduct, IReiews>({
      query : (data) => ({
        url : `/api/v1/reviews/update-review/${data.productId}?reviewId=${data.reviewId}`,
        method : "PUT",
        body : data,
      }), 
      invalidatesTags : ["Reviews"]
    }),
    deleteReview : builder.mutation({
      query : (data) => ({
        url : `/api/v1/reviews/remove-review/${data.productId}?reviewId=${data.reviewId}`,
        method : "PUT",
      }),
      invalidatesTags : ["Reviews"]
    }),
    deleteReviewByAdmin : builder.mutation({
      query : (data) => ({
        url : `/api/v1/reviews/admin-remove-review/${data.productId}?reviewId=${data.reviewId}`,
        method : "PUT",
      }),
      invalidatesTags : ["Reviews"]
    }),
  })
})



export const {useCreateReviewMutation , useUpdateReviewMutation ,
          useDeleteReviewMutation , useDeleteReviewByAdminMutation  } = reviewsApiSlice;