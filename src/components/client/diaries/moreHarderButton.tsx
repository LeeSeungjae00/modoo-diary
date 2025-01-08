import useLikeMutation from "@/hooks/mutations/useLikeMutation";
import useUnLikeMutation from "@/hooks/mutations/useUnLikeMutation";
import useCountDebounce from "@/hooks/useCountDebouce";
import useOptimisticPatchingCount from "@/hooks/useOptimisticPatchingCount";
import { AccessTokenPayload } from "@/types/auth";
import styled from "@emotion/styled";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const MoreHarder = styled.button`
  background-image: image-set(
    "static/images/moreharder.webp" type("image/webp"),
    "static/images/moreharder.png" type("image/png")
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

const MoreHarderDiv = styled.div`
  position: absolute;
  transition: rotate(45deg);
  transform: rotate(342deg);
  display: flex;
  bottom: 0.5rem;
  right: 6rem;
  color: red;
`;

export default React.memo(function MoreHarderButton({
  id,
  unlikeCount,
}: {
  id: number;
  unlikeCount: number;
}) {
  const route = useRouter();
  const { data: session } = useSession();
  const { mutate: unLike, isLoading: isLoadingLike } = useUnLikeMutation(id);
  const setCount = useCountDebounce((count) => unLike({ diaryId: id, count }));
  const setQueryFn = useOptimisticPatchingCount(id, "unlikeCount");

  const onClickMoreHarder = useCallback(() => {
    if (session?.user) {
      setCount((prev) => prev + 1);
      setQueryFn();
    } else {
      route.push("/auth/login", { scroll: false });
    }
  }, [route, session?.user, setCount, setQueryFn]);

  return (
    <MoreHarderDiv>
      <MoreHarder
        disabled={isLoadingLike}
        onClick={onClickMoreHarder}
      ></MoreHarder>
      x {unlikeCount}
    </MoreHarderDiv>
  );
});
