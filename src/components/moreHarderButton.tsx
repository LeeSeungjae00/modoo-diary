import useLikeMutation from "@/hooks/mutations/useLikeMutation";
import useUnLikeMutation from "@/hooks/mutations/useUnLikeMutation";
import { AccessTokenPayload } from "@/types/auth";
import styled from "@emotion/styled";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const MoreHarder = styled.button`
  background-image: url("/static/images/moreharder.png");
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
  isLogin,
  unlikeCount,
}: {
  id: number;
  isLogin: AccessTokenPayload | undefined;
  unlikeCount: number;
}) {
  const { mutate: unLike, isLoading: isLoadingLike } = useUnLikeMutation(id);
  const route = useRouter();
  const { data: session } = useSession();
  const onClickMoreHarder = (diaryId: number) => {
    if (session?.user) {
      unLike({ diaryId, memberId: session.user.id });
    } else {
      signOut({
        callbackUrl: "/auth/login",
      });
    }
  };
  return (
    <MoreHarderDiv>
      <MoreHarder
        disabled={isLoadingLike}
        onClick={() => onClickMoreHarder(id)}
      ></MoreHarder>
      x {unlikeCount}
    </MoreHarderDiv>
  );
});
