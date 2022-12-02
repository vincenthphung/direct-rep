import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_USERS_API_HOST,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/api/accounts",
        body: data,
        method: "post",
      }),
    }),
    editUser: builder.mutation({
      query: (arg) => {
        const { full_name, email, zipcode, password, userId } = arg;
        // console.log("edit user arg", arg);
        return {
          method: "put",
          url: `/api/accounts/${userId}`,
          credentials: "include",
          body: { full_name, email, zipcode, password },
          // params: { userId },
        };
      },
    }),
  }),
});

export const { useCreateUserMutation, useEditUserMutation } = usersApi;
