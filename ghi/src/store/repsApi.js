import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const repsApi = createApi({
  reducerPath: "reps",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LETTERS_API_HOST,
  }),
  endpoints: (builder) => ({
    createRep: builder.mutation({
      query: (data) => ({
        url: "/api/reps",
        body: data,
        method: "post",
      }),
    }),
  }),
});

export const { useCreateRepMutation } = repsApi;
