import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "./authApi";

export const lettersApi = createApi({
  reducerPath: "letter",
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
  tagTypes: ["LettersList"],
  endpoints: (builder) => ({
    getLetters: builder.query({
      query: () => "/api/letters",
    }),
    createLetter: builder.mutation({
      query: (arg) => {
        const { topic, stance } = arg;
        console.log("arg", arg);
        return {
          method: "post",
          url: `api/letters?topic=${topic}&stance=${stance}`,
          credentials: "include",
          // params: { topic, stance },
        };
      },
    }),
    editLetter: builder.mutation({
      query: (arg) => {
        const { oneId, oneContent } = arg;
        // console.log("edit letter arg", arg);
        return {
          method: "put",
          url: `letters/${oneId}?content=${oneContent}`,
          credentials: "include",
          params: { oneId, oneContent },
        };
      },
    }),
  }),
});

export const {
  useGetLettersQuery,
  useCreateLetterMutation,
  useEditLetterMutation,
} = lettersApi;
