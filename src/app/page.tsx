"use client";
import { getDiarys } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import useIntersection from "@/hooks/useIntersection";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FontSpan } from "@/components/common/fontSpan";
import { AuthContext } from "@/context/authInfo.context";
import DiaryDiv from "@/components/diaryDiv";
import { DiaryDivType } from "@/types/diary";
import { useIsMobile } from "@/hooks/useIsMobile";

export type Products = {
  products: number[];
};

export default function Home() {
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [API_ROUTE_DIARIES_GET],
    queryFn: ({ pageParam = 0 }) => getDiarys(pageParam),
    getNextPageParam: (lastPage) => {
      const nowPage = lastPage.number + 1;
      if (nowPage < lastPage.totalPages) {
        return nowPage;
      }
      return undefined;
    },
    select: (data) => {
      return {
        pageParams: data.pageParams,
        pages: data.pages.reduce((prev: any[], curr) => {
          return [...prev, ...curr.data];
        }, []),
      };
    },
  });
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);
  const { state } = useContext(AuthContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, intersecting, isFetchingNextPage, isSuccess]);

  return (
    <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-8 pt-28 ">
      {data &&
        (isMobile ? (
          data.pages.map((diary) => {
            return (
              <DiaryDiv
                key={diary.id}
                {...diary}
                isLogin={state.isLogin}
              ></DiaryDiv>
            );
          })
        ) : (
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              {data.pages
                .filter((_, i) => i % 2 === 0)
                .map((diary) => {
                  return (
                    <DiaryDiv
                      key={diary.id}
                      {...diary}
                      isLogin={state.isLogin}
                    ></DiaryDiv>
                  );
                })}
            </div>
            <div className="flex-1">
              {data.pages
                .filter((_, i) => i % 2 === 1)
                .map((diary) => {
                  return (
                    <DiaryDiv
                      key={diary.id}
                      {...diary}
                      isLogin={state.isLogin}
                    ></DiaryDiv>
                  );
                })}
            </div>
          </div>
        ))}

      <div ref={fetchMoreRef} />
      {(isLoading || isFetching) && (
        <FontSpan className="pt-5">일기를 쓰고있어요...</FontSpan>
      )}
      {!isLoading && !hasNextPage && (
        <p className="pt-5">🎉 모든 일기를 다 읽으셨어요.</p>
      )}
    </main>
  );
}
