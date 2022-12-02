import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./usersApi";
import { repsApi } from "./repsApi";
import { lettersApi } from "./lettersApi";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [repsApi.reducerPath]: repsApi.reducer,
    [lettersApi.reducerPath]: lettersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(repsApi.middleware)
      .concat(lettersApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);
