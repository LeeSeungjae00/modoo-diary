import {
  API_ROUTE_DIARIES_GET,
  API_ROUTE_DIARIES_POST,
} from "@/constants/api/diary";
import apiClient from "./modooClient";
import { DiaryType } from "@/types/diary";
import { getParsedToken } from "@/lib/authUtill";

export const getDiarys = (offset: number) => {
  const config = {
    params: {
      offset,
    },
  };

  return apiClient.get(API_ROUTE_DIARIES_GET, config);
};

export const postDiary = (diary: DiaryType) => {
  const memberId = getParsedToken()?.sub;
  return apiClient.post(API_ROUTE_DIARIES_POST, { ...diary, memberId });
};
