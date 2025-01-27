import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../service/axios";
import { endPoints } from "../../../constants/endpoints";

export const getDoctorsListBySearch = createAsyncThunk(
  //action type string
  "hcp/getDoctorsListBySearch",
  // callback function
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.get(endPoints.getDoctorsListBySearch, {
        headers: {
          search: params,
        },
      });
      return res?.data?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
export const getDoctorsList = createAsyncThunk(
  //action type string
  "hcp/getDoctorsList",
  // callback function
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.get(endPoints.getDoctorsList, {
        headers: {
          search: params,
        },
      });
      return { data: res?.data?.data, search: params };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
