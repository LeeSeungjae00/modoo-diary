"use client";
import { getDiarys } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import useIntersection from "@/hooks/useIntersection";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { FontSpan } from "@/components/common/fontSpan";

export type Products = {
  products: number[];
};

const DiaryDiv = styled.div`
  font-family: Chilgok_lws;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 0.5rem;
  background-size: cover;
  margin-bottom: 1.5rem;
  /* border: 1px solid #4e4e4e; */
  background-color: #f2f2f2;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const FontPre = styled.pre`
  font-family: Chilgok_lws;
  white-space: pre-wrap;
`;

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
      const nowPage = lastPage.data.data.number + 1;
      if (nowPage < lastPage.data.data.totalPages) {
        return nowPage;
      }
      return undefined;
    },
  });
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(fetchMoreRef);

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, intersecting, isFetchingNextPage, isSuccess]);

  return (
    <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-8 pt-28 ">
      {data &&
        data.pages
          .reduce((prev: any[], curr) => {
            return [...prev, ...curr.data.data.content];
          }, [])
          .map((diary) => {
            return (
              <DiaryDiv key={diary.id}>
                <div className="flex justify-between w-full">
                  <p className="text-lg">{diary.nickName}의 일기</p>
                  <div>
                    <p>
                      {format(
                        new Date(diary.createdTime),
                        "yyyy년 M월 d일 EEE",
                        {
                          locale: ko,
                        }
                      )}
                      요일
                    </p>
                    <p className="border-b-2 text-lg border-gray-500">
                      오늘날씨 {diary.weather}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <p className="pb-1 text-xl border-b-2 border-gray-500">
                    <strong>제목 : {diary.title}</strong>
                  </p>
                  <FontPre className="border-b-2 text-lg border-gray-500">
                    {diary.content}
                  </FontPre>
                  <p className="border-b-2 text-lg border-gray-500 text-end">
                    <strong>끄읏.</strong>
                  </p>
                </div>
              </DiaryDiv>
            );
          })}

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
