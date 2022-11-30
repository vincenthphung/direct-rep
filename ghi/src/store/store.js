import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./usersApi";
import { repsApi } from "./repsApi";
import { lettersApi } from "./lettersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [repsApi.reducerPath]: repsApi.reducer,
    [lettersApi.reducerPath]: lettersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(repsApi.middleware)
      .concat(lettersApi.middleware),
});

setupListeners(store.dispatch);
