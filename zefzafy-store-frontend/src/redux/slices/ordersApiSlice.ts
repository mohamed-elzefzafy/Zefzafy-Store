import { IGetOrder, IOrder } from "../../types";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, { paymentMethod: "Cash" | "Credit" }>(
      {
        query: (paymentMethod) => ({
          url: `/api/v1/orders/create-Order`,
          method: "POST",
          body: paymentMethod,
        }),
      }
    ),

    getOrdersByAdmin: builder.query<IGetOrder,string | void>({
      query: (page) => ({
        url: `/api/v1/orders/admin?page=${page}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),

    getOneOrder: builder.query<IOrder, string | void>({
      query: (id) => ({
        url: `/api/v1/orders/get-one-order/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateOrderToDeliver: builder.mutation<IOrder, string | void>({
      query: (id) => ({
        url: `/api/v1/orders/delivered/${id}`,
        method: "PUT",
      }),
    }),
    updateOrderToPaid: builder.mutation<IOrder, string | void>({
      query: (id) => ({
        url: `/api/v1/orders/paid/${id}`,
        method: "PUT",
      }),
    }),

    getOrdersByLoggedUser: builder.query<IGetOrder, void>({
      query: () => ({
        url: `/api/v1/orders/get-user-orders`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),


    //   payOrder : builder.mutation({
    //     query : ({id , details}) => ({
    //       url : `/api/v1/orders/${id}/pay`,
    //       method : "PUT",
    //       body : details
    //     }),
    //     keepUnusedDataFor : 5
    //     }),
    //     getPayPalClientId : builder.query({
    //       query : () => ({
    //         url : "/api/config/paypal",
    //       }),
    //       keepUnusedDataFor : 5
    //     }),
    //     getMyOrders : builder.query({
    //       query : () => ({
    //         url : "/api/v1/orders/myorders",
    //       }),
    //       keepUnusedDataFor : 5
    //     }),
    //     getOrders : builder.query({
    //       query : () => ({
    //         url : "/api/v1/orders",
    //       }),
    //       keepUnusedDataFor : 5
    //     }),
  }),
});

export const { useCreateOrderMutation, useGetOneOrderQuery , useUpdateOrderToDeliverMutation ,
   useUpdateOrderToPaidMutation , useGetOrdersByAdminQuery , useGetOrdersByLoggedUserQuery} = orderApiSlice;
