import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../state/searchProduct/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
