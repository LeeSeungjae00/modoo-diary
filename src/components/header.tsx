"use client";
import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontSpan } from "./common/fontSpan";
import { signOut, useSession } from "next-auth/react";

const GlobalNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  padding: 0 1rem;
`;

const LocalNav = styled.nav<{ isSticky: boolean }>`
  position: ${(props) => (props.isSticky ? "fixed" : "absolute")};
  top: ${(props) => (props.isSticky ? "0px" : "50px")};
  left: 0;
  z-index: 11;
  width: 100%;
  height: 52px;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd;
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  -moz-backdrop-filter: saturate(180%) blur(15px);
  -o-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
  background: rgba(255, 255, 255, 0.1);
`;

export default function Header() {
  const router = useRouter();
  const {data :session} = useSession()
  const [isSticky, setIsSticky] = useState(false);
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    if (scrollY < 50) {
      setIsSticky(false);
    } else {
      setIsSticky(true);
    }
  }, [setIsSticky]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const logout = () => {
    router.push("/");
    signOut()
  };

  return (
    <>
      <GlobalNav>
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-lg flex">
            ✎
            {session?.user.name
              ? (
                  <FontSpan className="text-lg">
                    {" "}
                    {session.user.name}
                  </FontSpan>
                ) || ""
              : " 모두"}
            의 일기
          </Link>
          {session ? (
            <div className="flex gap-2">
              <Link href="/my" className="font-bold">
                내 정보
              </Link>
              <button onClick={logout} className="font-bold">
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login" className="font-bold">
                로그인
              </Link>
              <Link href="/auth/signup" className="font-bold">
                회원 가입
              </Link>
            </div>
          )}
        </div>
      </GlobalNav>
      <LocalNav isSticky={isSticky}>
        {session ? (
          <div className="h-full max-w-5xl mx-auto flex items-center justify-end">
            <Link href="/write" className="font-bold">
              일기 쓰기 ✎
            </Link>
          </div>
        ) : (
          <div className="h-full max-w-5xl mx-auto flex items-center justify-end">
            <p className="font-bold">로그인을 하고 일기를 써보세요</p>
          </div>
        )}
      </LocalNav>
    </>
  );
}
