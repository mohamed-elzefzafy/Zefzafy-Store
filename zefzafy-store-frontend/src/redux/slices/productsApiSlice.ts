import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { ICreateProduct, IGetProduct, IProduct } from "../../types";


export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getProducts: builder.query<IGetProduct, string | void>({
      query: (queries) => ({
        url: `/api/v1/products/get-products${queries}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getProductsForAdmin: builder.query<IGetProduct, string | void>({
      query: (page) => ({
        url: `/api/v1/products/get-products?page=${page}`,
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
        url: `/api/v1/products/category-products/?${categoryId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation< void , {productId : string}>({
      query : (data) => ({
        url : `/api/v1/products/delete-product/${data.productId}`,
        method : "DELETE",
      }),

    }),
    createProduct: builder.mutation< ICreateProduct , FormData>({
      query : (data) => ({
        url : `/api/v1/products/create-product`,
        method : "POST",
        body : data,
      }),

    }),

    updateProduct: builder.mutation<ICreateProduct, { productId: string; data: FormData }>({
      query: ({ productId, data }) => ({
        url: `/api/v1/products/update-product/${productId}`,  // Use productId here
        method: "PUT",
        body: data,  // The form data
      }),
    }),

    }),

});

export const { useGetProductsQuery , useGetOneProductQuery , useGetProductsCategoryQuery ,
   useGetProductsForAdminQuery , useDeleteProductMutation , useCreateProductMutation , useUpdateProductMutation} = productsApiSlice;
