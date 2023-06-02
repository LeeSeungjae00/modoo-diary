import { API_ROUTE_MY_INFO } from "@/constants/api/members";
import apiClient from "./modooClient";

export const getMyInfo = (memberId: string) => {
  return () => apiClient.get(API_ROUTE_MY_INFO.replace(":id", memberId));
};
