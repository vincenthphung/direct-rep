import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { useAuthContext } from "./TokenTest.js";

export const repsApi = createApi({
  // { token } = useAuthContext();
  reducerPath: "reps",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LETTERS_API_HOST,
  }),
  endpoints: (builder) => ({
    createRep: builder.mutation({
      query: (data) => ({
        url: "/api/reps",
        body: data,
        // headers: { Authorization: `Bearer ${token}` },
        method: "post",
      }),
    }),
  }),
});

export const { useCreateRepMutation } = repsApi;
