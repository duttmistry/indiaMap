import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../service/axios";
import { endPoints } from "../../../constants/endpoints";

export const getPlannedAndVisitedData = createAsyncThunk(
  //action type string
  "map/getPlannedAndVisitedData",
  // callback function
  async (params, { rejectWithValue }) => {
    try {
      const res = await Axios.get(endPoints.getPlannedAndVisitedData);
      console.log("res: ", res);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);
