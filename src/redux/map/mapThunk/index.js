import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../service/axios";
import { LocalStorage_key } from "../../../service/localStorage";
import { endPoints } from "../../../endPoint";

export const getDoctorsListBySearch = createAsyncThunk(
  //action type string
  "hcp/getDoctorsListBySearch",
  // callback function
  async (params, { rejectWithValue }) => {
    const epc = localStorage.getItem(LocalStorage_key.emp_code) || "";
    try {
      const res = await Axios.get(endPoints.getDoctorsListBySearch, {
        headers: {
          search: params,
          epc: epc,
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
    const epc = localStorage.getItem(LocalStorage_key.emp_code) || "";
    console.log("%c  epc:", "color: #0e93e0;background: #aaefe5;", epc);
    try {
      const res = await Axios.get(endPoints.getDoctorsList, {
        headers: {
          search: params,
          epc: epc,
        },
      });
      return { data: res?.data?.data, search: params };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
