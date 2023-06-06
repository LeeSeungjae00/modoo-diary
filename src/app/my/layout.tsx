import CenterFormLayout from "@/layout/centerFormLayout";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CenterFormLayout>{children}</CenterFormLayout>;
}
