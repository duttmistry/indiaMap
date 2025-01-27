import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../../../service/axios";
import { endPoints } from "../../../endPoint";

export const auth = createAsyncThunk(
	//action type string
	"auth/authentication",
	// callback function
	async (params, { rejectWithValue }) => {
		try {
			const res = await Axios.get(endPoints.auth);
			return res?.data?.data;
		} catch (error) {
			return rejectWithValue(error?.response?.data?.message || error.message);
		}
	},
);