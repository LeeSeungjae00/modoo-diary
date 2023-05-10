"use client";

import { ACCESS_TOKEN_KEY } from "@/lib/authUtill";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create();

apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
if (typeof window !== "undefined") {
  apiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY
  )}`;
}

export default apiClient;
