"use client";
import useHeaderScroll from "@/hooks/useHeaderScroll";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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

export default function FixedHeader({ isLogin }: { isLogin: boolean }) {
  const isSticky = useHeaderScroll();

  return (
    <LocalNav isSticky={isSticky}>
      <div className="h-full max-w-5xl mx-auto flex items-center justify-end">
        {isLogin ? (
          <Link href="/write" className="font-bold">
            일기 쓰기 ✎
          </Link>
        ) : (
          <Link scroll={false} href="/auth/login" className="font-bold">
            로그인을 하고 일기를 써보세요
          </Link>
        )}
      </div>
    </LocalNav>
  );
}
