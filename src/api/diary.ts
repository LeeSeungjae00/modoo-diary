import {
  API_ROUTE_DIARIES_GET,
  API_ROUTE_DIARIES_PATCH,
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

  return apiClient.get(API_ROUTE_DIARIES_GET, config).then((res) => ({
    number: res.data.data.number,
    totalPages: res.data.data.totalPages,
    data: res.data.data.content,
  }));
};

export const postDiary = (diary: DiaryType) => {
  const memberId = getParsedToken()?.sub;
  return apiClient.post(API_ROUTE_DIARIES_POST, { ...diary, memberId });
};

export const patchDiary = (diary: DiaryType & { diaryId: number }) => {
  const memberId = getParsedToken()?.sub;

  const data = {
    title: diary.title,
    content: diary.content,
    memberId,
  };

  return apiClient.patch(
    API_ROUTE_DIARIES_PATCH.replace(":id", diary.diaryId.toString()),
    data
  );
};
