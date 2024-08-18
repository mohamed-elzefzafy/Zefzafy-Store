import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../utils/constants";

const baseQuery = fetchBaseQuery({
  baseUrl : baseURL,
  credentials : "include"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes : ["Products", "Order" , "User"],
  endpoints : (builder) => ({}),
}) 