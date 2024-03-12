import React from "react";
import MyForm from "@/components/client/my/MyForm";
import { getServerSession } from "next-auth";
import { getMyInfoSSR } from "@/api/members";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import authOption from "@/constants/authOption";
import Card from "@/components/server/common/Card";

export const metadata = {
  title: "모두의 일기 | 내 정보 수정",
  description: "내 정보 수정 페이지",
};

export default async function My() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect(`/auth/login`);
  }

  const { data } = await getMyInfoSSR(session.user.id.toString());

  if (!data) {
    signOut();
  }

  return (
    <Card title="내 정보를 수정하세요">
      <MyForm {...data}></MyForm>
    </Card>
  );
}
