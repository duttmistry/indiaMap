import axios from "axios";
import { LocalStorage_key } from "./localStorage";
import { baseUrl } from "../constants";

const Axios = axios.create({
  baseURL: baseUrl,
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

export { Axios };
