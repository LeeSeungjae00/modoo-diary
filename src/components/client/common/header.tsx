"use client";
import React from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import FixedHeader from "@/components/client/common/FixedHeader";
import { useSession } from "next-auth/react";

export default function Header() {
  // const session = await getServerSession(authOption);
  const { data: session } = useSession();
  return (
    <>
      <nav className="absolute top-0 left-0 z-10 w-full h-[50px] px-[1rem] py-0">
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/diaries" className="font-bold text-lg flex">
            ✎
            {session?.user.name
              ? (
                  <span className="text-lg font-Chilgok">
                    {" "}
                    {session.user.name}
                  </span>
                ) || ""
              : " 모두"}
            의 일기
          </Link>
          {session ? (
            <div className="flex gap-2">
              <Link href="/my" className="font-bold">
                내 정보
              </Link>
              <LogoutButton></LogoutButton>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link scroll={false} href="/auth/login" className="font-bold">
                로그인
              </Link>
              <Link href="/auth/signup" className="font-bold">
                회원 가입
              </Link>
            </div>
          )}
        </div>
      </nav>
      <FixedHeader isLogin={!!session}></FixedHeader>
    </>
  );
}
