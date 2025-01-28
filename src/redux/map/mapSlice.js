import { createSlice } from "@reduxjs/toolkit";
import { getPlannedAndVisitedData } from "./mapThunk";

const initialState = {
  data: [],
  loading: false,
  searchLoading: false,
  status: "idle",
  completed: false,
};

// A slice for dashboard with our reducers
export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlannedAndVisitedData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlannedAndVisitedData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload?.data;
        state.completed = true;
        state.status = "completed";
        state.searchValue = payload?.search;
      })
      .addCase(getPlannedAndVisitedData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
        state.data = [];
        state.status = "rejected";
        state.completed = true;
        state.searchValue = "";
      });
  },
});

// The reducer
export const mapReducer = mapSlice.reducer;
