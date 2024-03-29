import {
  API_ROUTE_DIARIES_DELETE,
  API_ROUTE_DIARIES_GET,
  API_ROUTE_DIARIES_PATCH,
  API_ROUTE_DIARIES_POST,
  API_ROUTE_DIARIES_STICKER_PUT,
  API_ROUTE_DIARIES_STICKER_PUT_V2,
} from "@/constants/api/diary";
import apiClient from "./modooClient";
import { DiaryType, DiaryWriteType } from "@/types/diary";
import { getParsedToken } from "@/lib/authUtill";
import { getSession } from "next-auth/react";

export const getDiary = (offset: number) => {
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

export const postDiary = ({
  diary,
  memberId,
}: {
  diary: DiaryWriteType;
  memberId: number;
}) => {
  return apiClient.post(API_ROUTE_DIARIES_POST, { ...diary, memberId });
};

export const patchDiary = (
  diary: DiaryType & { diaryId: number; memberId: number }
) => {
  const data = {
    title: diary.title,
    content: diary.content,
    memberId: diary.memberId,
  };

  return apiClient.patch(
    API_ROUTE_DIARIES_PATCH.replace(":id", diary.diaryId.toString()),
    data
  );
};

export const deletedDiary = (diaryId: number) => {
  return apiClient.delete(
    API_ROUTE_DIARIES_DELETE.replace(":id", diaryId.toString())
  );
};

export const putDiaryLike = async ({
  diaryId,
  memberId,
}: {
  diaryId: number;
  memberId: number;
}) => {
  const config = {
    params: {
      memberId,
      diaryId,
      recommendYn: "Y",
    },
  };

  return apiClient.put(API_ROUTE_DIARIES_STICKER_PUT, null, config);
};

export const putDiaryLikeV2 = async ({
  diaryId,
  count,
}: {
  diaryId: number;
  count: number;
}) => {
  return apiClient.put(API_ROUTE_DIARIES_STICKER_PUT_V2, {
    diaryId,
    recommend: count,
  });
};

export const putDiaryUnLike = ({
  diaryId,
  memberId,
}: {
  diaryId: number;
  memberId: number;
}) => {
  const config = {
    params: {
      memberId,
      diaryId,
      unlikeYn: "Y",
    },
  };

  return apiClient.put(API_ROUTE_DIARIES_STICKER_PUT, null, config);
};

export const putDiaryUnLikeV2 = ({
  diaryId,
  count,
}: {
  diaryId: number;
  count: number;
}) => {
  const config = {
    params: {
      diaryId,
      unlike: count,
    },
  };

  return apiClient.put(API_ROUTE_DIARIES_STICKER_PUT_V2, {
    diaryId,
    unlike: count,
  });
};
