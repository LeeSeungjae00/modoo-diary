import React from "react";
import MyForm from "@/components/client/my/MyForm";
import { getServerSession } from "next-auth";
import { getMyInfoSSR } from "@/api/members";
import { getToken } from "next-auth/jwt";
import { authOption } from "../api/auth/[...nextauth]/route";

export default async function My() {
  const session = await getServerSession(authOption);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data } = await getMyInfoSSR(session.user.id.toString());

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        내 정보를 수정하세요
      </h1>
      <MyForm {...data}></MyForm>
    </div>
  );
}
