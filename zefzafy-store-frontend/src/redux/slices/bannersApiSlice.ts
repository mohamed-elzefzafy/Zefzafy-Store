import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { IBannersResult, IProduct } from "../../types";

export interface IBanners{

    comment : string,
    rating : number,
    productId : string,
    reviewId? : string,

}

export const bannersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getBanners: builder.query<IBannersResult[],void>({
      query: () => ({
        url: `/api/v1/banners/get-hero-slider-images`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Banners"],
    }),


    getOneBanner: builder.query<IBannersResult,  string | void>({
      query: (bannerId) => ({
        url: `/api/v1/banners/get-hero-slider-images/${bannerId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Banners"],
    }),



    createBanner : builder.mutation<IBannersResult, FormData>({
      query : (data) => ({
        url : `/api/v1/banners/create-hero-slider-banners`,
        method : "POST",
        body : data,
      }),
      invalidatesTags : ["Banners"]
    }),

      updateBanner : builder.mutation<IBannersResult, { bannerId: string; data: FormData }>({
        query : ({ bannerId, data }) => ({
          url : `/api/v1/banners/update-hero-slider-images/${bannerId}`,
          method : "PUT",
          body : data,
        }),
        invalidatesTags : ["Banners"]
      }),


      deleteBanner : builder.mutation< void , {bannerId : string}>({
        query : ({bannerId}) => ({
          url : `/api/v1/banners/delete-hero-slider-images/${bannerId}`,
          method :  "DELETE",
        }),
      }),

  })
})



export const { useGetBannersQuery , useCreateBannerMutation ,
   useUpdateBannerMutation ,useDeleteBannerMutation , useGetOneBannerQuery} = bannersApiSlice;