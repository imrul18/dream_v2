import axios from "axios";
import baseUrl from "./../config";

let Api = axios.create({
  baseURL: baseUrl,

  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
  transformResponse: (data) => {
    if (data) {
      let response = JSON.parse(data);
      return response;
    }
  },

  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

Api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("accessToken")
    ? `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    : null;
  return config;
});

export default Api;
