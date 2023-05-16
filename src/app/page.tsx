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
`;

export default function Home() {
  const {
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
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
  }, [intersecting]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-28 ">
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
                  <p>
                    {format(new Date(diary.createdTime), "yyyy년 M월 d일 EEE", {
                      locale: ko,
                    })}
                    요일
                  </p>
                </div>
                <div>
                  <p className="pb-1 text-lg">제목 : {diary.title}</p>
                  <p>오늘날씨 {diary.weather}</p>
                  <p>{diary.content}</p>
                </div>
              </DiaryDiv>
            );
          })}

      <div ref={fetchMoreRef} />
      {isLoading && <FontSpan className="pt-5">일기를 쓰고있어요...</FontSpan>}
      {!isLoading && !hasNextPage && (
        <p className="pt-5">🎉 모든 일기를 다 읽으셨어요.</p>
      )}
    </main>
  );
}
