"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const logout = () => {
    signOut();
  };

  return (
    <button onClick={logout} className="font-bold">
      로그아웃
    </button>
  );
}
