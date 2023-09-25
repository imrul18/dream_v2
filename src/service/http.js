import axios from "axios";
import baseUrl from "./../config";
import AuthService from "./AuthService";

let Api = axios.create({
  baseURL: baseUrl,

  headers: {
    "Content-type": "multipart/form-data",
    accept: "application/json",
  },
  transformResponse: (data) => {
    let response = JSON.parse(data);
    if (
      response?.errors &&
      response?.errors[0]?.extensions?.code == "TOKEN_EXPIRED"
    ) {
      AuthService.refreshToken();
    } else {
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
