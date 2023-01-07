import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import globalReducer from "../features/globalSlice.js";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: getDefaultMiddleware().concat(logger),
});

export default store;
