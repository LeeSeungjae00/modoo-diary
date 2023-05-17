import apiClient from "@/api/modooClient";
import { AccessTokenPayload } from "@/types/auth";
import jwtDecode from "jwt-decode";

export const ACCESS_TOKEN_KEY =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_STORAGE_KEY || "";
export const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_STORAGE_KEY || "";

export const setAuthToken = ({
  accessToken,
  refreshToken,
  grantType = "Bearer",
}: {
  accessToken: string;
  refreshToken?: string;
  grantType?: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getParsedToken = () => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    return jwtDecode<AccessTokenPayload>(accessToken);
  }
  return null;
};
