import React from "react";
import Link from "next/link";
import LoginForm from "@/components/client/login/LoginForm";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOption);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        모두의 일기에 로그인 하세요
      </h1>
      <LoginForm></LoginForm>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        계정이 없으신가요?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          회원 가입
        </Link>
      </p>
    </div>
  );
}
