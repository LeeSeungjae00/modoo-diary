"use client";
import { getDiarys } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export type Products = {
  products: number[];
};

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          query.fetchNextPage();
        }}
      >
        go
      </button>
      {query.data &&
        JSON.stringify(
          query.data.pages.reduce((prev: any[], curr) => {
            return [...prev, ...curr.data.data.content];
          }, [])
        )}
    </main>
  );
}
