import React from "react";
import SignIn from "@/app/auth/login/page";
import RouteModal from "@/components/client/common/RouteModal";
import CenterFormLayout from "@/layout/centerFormLayout";

export default async function Page() {
  return (
    <RouteModal>
      <CenterFormLayout>
        {/* @ts-expect-error Async Server Component */}
        <SignIn></SignIn>
      </CenterFormLayout>
    </RouteModal>
  );
}
