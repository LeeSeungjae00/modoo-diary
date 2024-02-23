import CenterFormLayout from "@/layout/centerFormLayout";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CenterFormLayout>{children}</CenterFormLayout>
      <ToastContainer autoClose={5000}></ToastContainer>
    </>
  );
}
