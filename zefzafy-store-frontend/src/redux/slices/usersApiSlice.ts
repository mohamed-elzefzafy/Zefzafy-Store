import { IGetUser } from "../../types";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    login : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/login`,
        method : "POST",
        body : data,
      })
    }),

    registerUser : builder.mutation({
      query : (data) => ({
        url : `/api/v1/users/register`,
        method : "POST",
        body : data,
      })
    }),
    logout : builder.mutation({
      query : () => ({
      url : `/api/v1/users/logout`,
      method : "POST",
      })
    }),
    getUsersAdmin: builder.query<IGetUser, string | void>({
      query: (page) => ({
        url: `/api/v1/users/admin-get-users?page=${page}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    
    }),

    deleteUser: builder.mutation< void , {userId : string}>({
      query : (data) => ({
        url : `api/v1/users/delete-user/${data.userId}`,
        method : "DELETE",
      }),
    }),

    updateUserProfile: builder.mutation<IGetUser, {data : FormData}>({
      query: ({data }) => ({
        url: `/api/v1/users/update-user`,  
        method: "PUT",
        body: data,  
      }),
    }),

  })
})


export const { useLogoutMutation , useRegisterUserMutation , useLoginMutation ,
   useGetUsersAdminQuery , useDeleteUserMutation , useUpdateUserProfileMutation} = usersApiSlice;
