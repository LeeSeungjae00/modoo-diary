"use client";
import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { removeAuthToken } from "@/lib/authUtill";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authInfo.context";

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
  const { state, dispatch } = useContext(AuthContext);

  const logout = () => {
    removeAuthToken();
    dispatch({ type: "SIGNOOUT", payload: true });
  };

  return (
    <>
      <GlobalNav>
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold">
            모두의 일기
          </Link>
          {state.isLogin ? (
            <button onClick={logout} className="font-bold">
              로그아웃
            </button>
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
      <LocalNav>
        <div className="h-full max-w-5xl mx-auto flex items-center"></div>
      </LocalNav>
    </>
  );
}
