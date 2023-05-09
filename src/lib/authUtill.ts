import apiClient from "@/api/modooClient";

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_STORAGE_KEY || "";
const REFRESH_TOKEN_KEY =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_STORAGE_KEY || "";

export const setAuthToken = ({
  accessToken,
  refreshToken,
  grantType,
}: {
  accessToken: string;
  refreshToken?: string;
  grantType: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  apiClient.defaults.headers.common.Authorization = `${grantType} ${accessToken}`;
};
