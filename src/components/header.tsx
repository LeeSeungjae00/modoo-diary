"use client";
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const GlobalNav = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  padding: 0 1rem;
`;

const LocalNav = styled.nav`
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 52px;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd;
`;

export default function Header() {
  return (
    <>
      <GlobalNav>
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold">
            모두의 일기
          </Link>
          <div className="flex gap-2">
            <Link href="/auth/login" className="font-bold">
              로그인
            </Link>
            <Link href="/auth/signin" className="font-bold">
              회원 가입
            </Link>
          </div>
        </div>
      </GlobalNav>
      <LocalNav>
        <div className="h-full max-w-5xl mx-auto flex items-center"></div>
      </LocalNav>
    </>
  );
}
