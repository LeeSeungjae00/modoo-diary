import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import apiClient from "./modooClient";

export const getDiarys = (offset: number) => {
  const config = {
    params: {
      offset,
    },
  };

  return apiClient.get(API_ROUTE_DIARIES_GET, config);
};
