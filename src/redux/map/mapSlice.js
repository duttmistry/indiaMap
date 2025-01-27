import { createSlice } from "@reduxjs/toolkit";
import { getDoctorsList, getDoctorsListBySearch } from "./mapThunk";

const initialState = {
  data: [],
  loading: false,
  searchLoading: false,
  status: "idle",
  completed: false,
  searchValue: "",
};

// A slice for dashboard with our reducers
export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctorsList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload?.data
          // ?.sort((a, b) => a?.doctor_name.localeCompare(b?.doctor_name))
          ?.map((item) => {
            return {
              ...item,
              profile: item?.doctor_name ? item?.doctor_name.split(" ") : [],
            };
          });

        state.completed = true;
        state.status = "completed";
        state.searchValue = payload?.search;
      })
      .addCase(getDoctorsList.rejected, (state, { error }) => {
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
