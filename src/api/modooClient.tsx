"use client";

import { API_ROUTE_AUTH_REISSUE } from "@/constants/api/auth";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  removeAuthToken,
  setAuthToken,
} from "@/lib/authUtill";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (typeof window !== "undefined") {
  apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (
      refreshToken &&
      originalRequest._retry !== true &&
      error.response.status === 401 &&
      !originalRequest.url.includes("/api/auth")
    ) {
      originalRequest._retry = true;

      const data = {
        refreshToken,
        accessToken,
      };

      return apiClient
        .post(API_ROUTE_AUTH_REISSUE, data)
        .then((res: AxiosResponse) => {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            res.data.data;

          setAuthToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        })
        .catch(() => {
          removeAuthToken();
          delete apiClient.defaults.headers.common.Authorization;
          window.location.href = "/auth/login";

          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
