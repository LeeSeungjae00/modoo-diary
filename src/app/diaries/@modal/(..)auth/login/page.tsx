"use client";
import React from "react";
import SignIn from "@/app/auth/login/page";
import RouteModal from "@/components/client/common/RouteModal";
import CenterFormLayout from "@/layout/centerFormLayout";
import Card from "@/components/server/common/Card";
import LoginForm from "@/components/client/auth/login/LoginForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <RouteModal>
      <CenterFormLayout>
        <Card title="모두의 일기에 로그인 하세요">
          <LoginForm loginCallBack={() => router.back()}></LoginForm>
        </Card>
      </CenterFormLayout>
    </RouteModal>
  );
}
