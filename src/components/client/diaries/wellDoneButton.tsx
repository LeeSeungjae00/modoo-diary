import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import useLikeMutation from "@/hooks/mutations/useLikeMutation";
import useCountDebounce from "@/hooks/useCountDebouce";
import useOptimisticPatchingCount from "@/hooks/useOptimisticPatchingCount";
import { AccessTokenPayload } from "@/types/auth";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import { th } from "date-fns/locale";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

const WellDone = styled.button`
  background-image: image-set(
    "static/images/welldone-removebg-preview.webp" type("image/webp"),
    "static/images/welldone-removebg-preview.png" type("image/png")
  );
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
  const route = useRouter();
  const { data: session } = useSession();
  const { mutate: like, isLoading: isLoadingLike } = useLikeMutation(id);
  const setCount = useCountDebounce((count) => like({ diaryId: id, count }));
  const setQueryFn = useOptimisticPatchingCount(id, "recommendCount");

  const onClickWellDone = useCallback(() => {
    if (session?.user) {
      setCount((prev) => prev + 1);
      setQueryFn();
    } else {
      route.push("/auth/login", { scroll: false });
    }
  }, [session?.user, setCount, setQueryFn, route]);

  return (
    <WellDoneDiv>
      <WellDone disabled={isLoadingLike} onClick={onClickWellDone}></WellDone>x{" "}
      {recommendCount}
    </WellDoneDiv>
  );
});
