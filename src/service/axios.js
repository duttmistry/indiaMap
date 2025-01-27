import axios from "axios";
import { BASE_URL } from "../constants";
import { LocalStorage_key } from "./localStorage";

const Axios = axios.create({
  baseURL: BASE_URL,
});

Axios.interceptors.request.use(
  (req) => {
    // console.log('%c  req:', 'color: #0e93e0;background: #aaefe5;', req);
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem(LocalStorage_key.token || "")
      )}`,
      // epc:_doEncrypt(localStorage.getItem(LocalStorage_key.emp_code) || ""),
    };

    return req;
  },
  (error) => {
    console.log("%c  error:", "color: #0e93e0;background: #aaefe5;", error);
    if (error?.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx will trigger this function
    // Do something with response data
    return response;
  },
  (error) => {
    console.log("%c  error:", "color: #0e93e0;background: #aaefe5;", error);
    if (error?.response?.status === 401) {
      localStorage.clear();
    } else {
    }
    console.log("err:======> ", error);
    return Promise.reject(error);
  }
);

// Axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     if (err.response.status === 401) {
//       showToastMassage();
//       store.dispatch(logOutUser());
//       return Promise.reject(err);
//     }
//     if (err.response.status === 404) {
//       return Promise.reject(err);
//     }
//     if (err.response.status === 400) {
//     //   if (
//     //     err.response.data.message ===
//     //     "User is not authorized for this operation"
//     //   ) {
//     //     toast.error(err.response.data.message);
//     //   } else {
//         showToastMassagePermition(err.response.data.message);
//     //   }
//       return Promise.reject(err);
//     }
//     // toast.error(err.response.data.message);
//     return Promise.reject(err);
//   }
// );

export { Axios };
