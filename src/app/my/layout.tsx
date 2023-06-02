import CenterFormLayout from "@/layout/centerFormLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CenterFormLayout>{children}</CenterFormLayout>;
}
