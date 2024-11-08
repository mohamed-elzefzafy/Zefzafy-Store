import { IGetCounts} from "../../types";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    getAllCounts: builder.query<IGetCounts, void>({
      query: () => ({
        url: `/api/v1/utils/all-counts`,
      }),
      keepUnusedDataFor: 5,
    }),

  })
})


export const {useGetAllCountsQuery} = usersApiSlice;
