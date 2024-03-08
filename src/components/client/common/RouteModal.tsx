"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function RouteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.back();
      }}
      className="z-40 w-screen h-screen fixed top-0 left-0 bg-[#000000c9]"
    >
      {children}
    </div>
  );
}
