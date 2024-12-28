import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import {  IProduct, IUserInfo } from "../../types";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    toggleWishlist : builder.mutation<IUserInfo, {productId : string}>({
      query : ({productId}) => ({
        url : `/api/v1/wishlist/add-wishlist/${productId}`,
        method : "PUT",
      }),
    }),

    getLoggedUserWishlist :builder.query<IProduct[],string | void>({
      query : () => ({
        url : `/api/v1/wishlist/add-wishlist/logged-user`,
      }),
    }),
  })
})



export const {useToggleWishlistMutation , useGetLoggedUserWishlistQuery} = wishlistApiSlice;