"use client";
import { getDiarys } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import useIntersection from "@/hooks/useIntersection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { FontSpan } from "@/components/common/fontSpan";
import DiaryDiv from "@/components/diaryDiv";
import { useIsMobile } from "@/hooks/useIsMobile";

export type Products = {
  products: number[];
};

export default function InfiniteDiary() {
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
    queryFn: ({ pageParam = 1 }) => getDiarys(pageParam),
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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, intersecting, isFetchingNextPage, isSuccess]);

  return (
    <>
      {data &&
        (isMobile ? (
          data.pages.map((diary) => {
            return <DiaryDiv key={diary.id} {...diary}></DiaryDiv>;
          })
        ) : (
          <div className="flex gap-4 w-full">
            <div className="flex-1">
              {data.pages
                .filter((_, i) => i % 2 === 0)
                .map((diary) => {
                  return <DiaryDiv key={diary.id} {...diary}></DiaryDiv>;
                })}
            </div>
            <div className="flex-1">
              {data.pages
                .filter((_, i) => i % 2 === 1)
                .map((diary) => {
                  return <DiaryDiv key={diary.id} {...diary}></DiaryDiv>;
                })}
            </div>
          </div>
        ))}
      {(isLoading || isFetching) && (
        <FontSpan className="pt-5">일기를 쓰고있어요...</FontSpan>
      )}
      {!(isLoading || isFetching) && !hasNextPage && (
        <p className="pt-5">🎉 모든 일기를 다 읽으셨어요.</p>
      )}
      <div ref={fetchMoreRef} />
    </>
  );
}
