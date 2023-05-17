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
    ACCESS_TOKEN_KEY
  )}`;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (
      refreshToken &&
      originalRequest._retry !== true &&
      error.response.status === 401
    ) {
      originalRequest._retry = true;

      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };

      return apiClient
        .post(API_ROUTE_AUTH_REISSUE, null, config)
        .then((res: AxiosResponse) => {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            res.data;

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

          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
