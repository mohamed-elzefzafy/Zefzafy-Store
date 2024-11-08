import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { ICategory, ICreateCategory, IGetCategory, IUpdateCategory } from "../../types";

interface IGetProduct {

}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCategories: builder.query<ICategory[],string | void>({
      query: (page) => ({
        url: `/api/v1/categories?page=${page}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),

    getCategoriesForAdmin: builder.query<IGetCategory,string | void>({
      query: (page) => ({
        url: `/api/v1/categories/admin?page=${page}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation< ICreateCategory , FormData>({
      query : (data) => ({
        url : `/api/v1/categories/create-category`,
        method : "POST",
        body : data,
      }),

    }),
    updateCategory: builder.mutation<ICreateCategory, { categorytId: string; data: FormData }>({
      query: ({ categorytId, data }) => ({
        url: `/api/v1/categories/update-category/${categorytId}`, 
        method: "PUT",
        body: data,  
      }),
    }),
    getOneCategory: builder.query<ICategory, string | void>({
      query: (categorytId) => ({
        url: `/api/v1/categories/get-one-category/${categorytId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["categories"],
    }),

    deleteCategory: builder.mutation< void , {categoryId : string}>({
      query : (data) => ({
        url : `/api/v1/categories/delete-category/${data.categoryId}`,
        method : "DELETE",
      }),

    }),

  }),
});

export const { useGetCategoriesQuery , useCreateCategoryMutation , useUpdateCategoryMutation 
  , useGetOneCategoryQuery , useDeleteCategoryMutation , useGetCategoriesForAdminQuery} = categoriesApiSlice;;