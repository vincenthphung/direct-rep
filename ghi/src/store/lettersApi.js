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
    }),
    editLetter: builder.mutation({
      query: (arg) => {
        const { letter_id, content } = arg;
        console.log(arg);
        return {
          method: "put",
          url: `/api/letters/{letters_id}?letter_id=${letter_id}&content=${content}`,
          params: { letter_id, content },
        };
      },
    }),
  }),
});

export const { useGetLettersQuery, useCreateLetterMutation, useEditLetterMutation } = lettersApi;
