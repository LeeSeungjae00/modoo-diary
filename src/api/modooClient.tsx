"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (typeof window !== "undefined") {
  apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    process.env.NEXT_PUBLIC_ACCESS_TOKEN!!
  )}`;
}

export default apiClient;
