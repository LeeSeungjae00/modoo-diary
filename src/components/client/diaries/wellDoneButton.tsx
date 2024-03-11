import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import useLikeMutation from "@/hooks/mutations/useLikeMutation";
import { AccessTokenPayload } from "@/types/auth";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { th } from "date-fns/locale";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const WellDone = styled.button`
  background-image: url("/static/images/welldone-removebg-preview.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: transparent;
  &:hover {
    background-color: #a8a8a8c2;
  }
  &:active {
    width: 3.8rem;
    height: 3.8rem;
    margin: 0.1rem;
  }
`;

const WellDoneDiv = styled.div`
  position: absolute;
  transition: rotate(45deg);
  transform: rotate(342deg);
  display: flex;
  bottom: 0.5rem;
  right: 1.5rem;
  color: red;
`;

export default React.memo(function WellDoneButton({
  id,
  recommendCount,
}: {
  id: number;
  recommendCount: number;
}) {
  const { mutate: like, isLoading: isLoadingLike } = useLikeMutation(id);
  const [throttle, setThrottle] = useState(0);
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();
  const route = useRouter();
  const { data: session } = useSession();

  const onClickWellDone = useCallback(() => {
    if (session?.user) {
      console.log(count);
      like({ diaryId: id, memberId: session.user.id, count: count });
    } else {
      route.push("/auth/login", { scroll: false });
    }
  }, [count, id, like, route, session]);

  useEffect(() => {
    if (throttle === 0 && count > 0) {
      onClickWellDone();
      setCount(0);
    }
  }, [count, onClickWellDone, throttle]);

  return (
    <WellDoneDiv>
      <WellDone
        disabled={isLoadingLike}
        onClick={() => {
          setCount((prev) => prev + 1);
          if (throttle === 0) {
            setThrottle(1);
            setTimeout(() => {
              console.log("throttle");
              setThrottle(0);
            }, 2000);
          }
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
                        recommendCount: val.recommendCount + 1,
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
        }}
      ></WellDone>
      x {recommendCount}
    </WellDoneDiv>
  );
});
