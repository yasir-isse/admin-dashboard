import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import globalReducer from "../features/globalSlice.js";
import logger from "redux-logger";
import { apiSlice } from "../features/api.js";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware, logger),
});

export default store;
