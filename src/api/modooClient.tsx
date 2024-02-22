"use client";

import { API_ROUTE_AUTH_REISSUE } from "@/constants/api/auth";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  removeAuthToken,
  setAuthToken,
} from "@/lib/authUtill";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create();

(async () => {
  const session = await getSession();

  apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  apiClient.defaults.headers.put["Content-Type"] = "application/json";
  apiClient.defaults.headers.common["Content-Type"] = "application/json";
  if (session?.user.accessToken) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${session?.user.accessToken}`;
  }
})();
const session = getSession();

apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
apiClient.defaults.headers.put["Content-Type"] = "application/json";
apiClient.defaults.headers.common["Content-Type"] = "application/json";
if (typeof window !== "undefined") {
  apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
}

export const reissue = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string;
}) =>
  apiClient
    .post(API_ROUTE_AUTH_REISSUE, {
      accessToken,
      refreshToken,
    })
    .then((res: AxiosResponse) => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        res.data.data;

      console.log(newAccessToken, newRefreshToken);

      setAuthToken({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      return res;
    });

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

      return reissue(data)
        .then((res) => {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            res.data.data;
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
