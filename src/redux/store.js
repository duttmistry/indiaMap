import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mapReducer } from "./map/mapSlice";

const combinedReducer = combineReducers({
  // auth: authReducer,
  map: mapReducer,
});

export const store = configureStore({
  reducer: combinedReducer,
});
