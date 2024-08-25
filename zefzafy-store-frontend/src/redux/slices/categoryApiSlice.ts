import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { ICategory } from "../../types";

interface IGetProduct {

}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: `/api/v1/categories`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;;