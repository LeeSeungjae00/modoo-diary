"use client";
import { getDiarys } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  const query = useInfiniteQuery({
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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button
        onClick={() => {
          query.fetchNextPage();
        }}
      >
        go
      </button>

      {query.data &&
        query.data.pages
          .reduce((prev: any[], curr) => {
            return [...prev, ...curr.data.data.content];
          }, [])
          .map((diary) => {
            return (
              <DiaryDiv key={diary.id}>
                <div className="flex justify-between">
                  <p className="text-lg">{diary.nickName}의 일기</p>
                </div>
                <div>
                  <p className="pb-1">제목 : {diary.title}</p>
                  <p>오늘날씨 {diary.weather}</p>
                  <p>{diary.content}</p>
                </div>
              </DiaryDiv>
            );
          })}
    </main>
  );
}
