import { createSlice } from "@reduxjs/toolkit";
import { auth } from "./authThunk";
import { LocalStorage_key } from "../../service/localStorage";
import { _doEncrypt } from "../../utils/utility";
import { useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";


const initialState = {
  data: [],
  loading: false,
  status: "idle",
  completed: false,
  headerTitle: "Home",
};
const msalInstance = new PublicClientApplication(msalConfig);

const storeDataLocalStorage=(data)=> {
  localStorage.setItem(LocalStorage_key.user_name, data?.displayName);
  localStorage.setItem(LocalStorage_key.user_email, data?.email);
  localStorage.setItem(
    LocalStorage_key.emp_code,
    data?.employee_position_code
  );
  localStorage.setItem(LocalStorage_key.user_role, data?.role);
  localStorage.setItem(LocalStorage_key.login_time, _doEncrypt(JSON.stringify(data?.login_time || "")));
  localStorage.setItem(LocalStorage_key.is_super_admin, _doEncrypt(JSON.stringify(data?.super_admin || false)));
  const is_read_only = data?.super_admin === true ? false : true
  localStorage.setItem(LocalStorage_key.is_read_only, _doEncrypt(JSON.stringify(is_read_only)));

  // Application
  localStorage.setItem(LocalStorage_key.application, _doEncrypt(JSON.stringify(data?.application)));

  localStorage.setItem(LocalStorage_key.auth_called, "true");

}
// A slice for dashboard with our 3 reducers
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        // localStorage.setItem(
        //   LocalStorage_key.emp_code,
        //   JSON.stringify(payload?.employee_position_code)
        // );
        // localStorage.setItem(
        //   LocalStorage_key.user_role,
        //   JSON.stringify(payload?.role)
        // );
        // localStorage.setItem(
        //   LocalStorage_key.user_name,
        //   JSON.stringify(payload?.displayName)
        // );
        // localStorage.setItem(
        //   LocalStorage_key.application,
        //   (_doEncrypt(payload?.application))
        // );

        storeDataLocalStorage(payload);

        state.completed = true;
        state.status = "completed";
      })
      .addCase(auth.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload;
        state.data = [];
        state.status = "rejected";
        state.completed = true;
        localStorage.clear();
        msalInstance.logoutRedirect().catch((error) => {
          console.error("Logout failed:", error);
        });
      });
  },
});

// The reducer
export const authReducer = authSlice.reducer;
export const { setHeaderTitle } = authSlice.actions;
