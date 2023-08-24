import {
  API_ROUTE_MY_INFO,
  API_ROUTE_PATCH_EMAIL,
  API_ROUTE_PATCH_NICKNAME,
  API_ROUTE_PATCH_REGION,
} from "@/constants/api/members";
import apiClient from "./modooClient";

export const getMyInfo = (memberId: string) => {
  return () => apiClient.get(API_ROUTE_MY_INFO.replace(":id", memberId));
};

export const getMyInfoSSR = async (memberId: string) => {
  const res = await fetch(API_ROUTE_MY_INFO.replace(":id", memberId), {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export const patchRegion = (data: { memberId: string; region: string }) => {
  return apiClient.patch(API_ROUTE_PATCH_REGION, data);
};

export const patchEmail = (data: { memberId: string; email: string }) => {
  return apiClient.patch(API_ROUTE_PATCH_EMAIL, data);
};

export const patcNickname = (data: { memberId: string; nickName: string }) => {
  return apiClient.patch(API_ROUTE_PATCH_NICKNAME, data);
};
