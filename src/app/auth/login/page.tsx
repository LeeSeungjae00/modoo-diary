import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOption from "@/constants/authOption";
import Card from "@/components/server/common/Card";
import LoginForm from "@/components/client/auth/login/LoginForm";

export const metadata = {
  title: "모두의 일기 | 로그인",
  description: "로그인 페이지",
};

export default async function SignIn() {
  const session = await getServerSession(authOption);

  if (session?.user) {
    redirect("/");
  }

  return (
    <Card title="모두의 일기에 로그인 하세요">
      <LoginForm></LoginForm>
    </Card>
  );
}
