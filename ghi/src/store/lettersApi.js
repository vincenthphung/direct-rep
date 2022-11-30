import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lettersApi = createApi({
  reducerPath: "letter",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LETTERS_API_HOST,
  }),
  tagTypes: ["LettersList"],
  endpoints: (builder) => ({
    getLetters: builder.query({
      query: () => "/api/letters",
      // providesTags: ['LettersList'],
    }),
    createLetter: builder.mutation({
      query: (arg) => {
        const { topic, stance } = arg;
        console.log(arg);
        return {
          method: "post",
          url: `api/letters?topic=${topic}&stance=${stance}`,
          params: { topic, stance },
        };
      },
      // invalidatesTags: ['LettersList'],
    }),
  }),
});

export const { useGetLettersQuery, useCreateLetterMutation } = lettersApi;
