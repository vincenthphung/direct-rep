import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authApi";

export const repsApi = createApi({
  reducerPath: "reps",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LETTERS_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApi.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createRep: builder.mutation({
      query: (data) => ({
        url: "/api/reps",
        body: data,
        credentials: "include",
        method: "post",
      }),
    }),
  }),
});

export const { useCreateRepMutation } = repsApi;
