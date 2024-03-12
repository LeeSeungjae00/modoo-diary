import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function useOptimisticPatchingCount(
  id: number,
  separator: "recommendCount" | "unlikeCount"
) {
  const queryClient = useQueryClient();

  const setQueryFn = () => {
    queryClient.setQueryData<{
      pageParams: undefined | number[];
      pages: InfinitiScrollDataType<DiaryPageType>[];
    }>([API_ROUTE_DIARIES_GET], (old) => {
      if (old) {
        const { pageParams, pages } = old;
        const newPages = pages.map((page) => {
          const findedIndex = page.data.findIndex((val) => val.id === id);
          if (findedIndex > -1) {
            const newdata = page.data.map((val) => {
              if (val.id === id) {
                return {
                  ...val,
                  [separator]: val[separator] + 1,
                };
              }
              return val;
            });

            return {
              ...page,
              data: newdata,
            };
          }
          return page;
        });
        return {
          pageParams,
          pages: newPages,
        };
      }
    });
  };

  return setQueryFn;
}
