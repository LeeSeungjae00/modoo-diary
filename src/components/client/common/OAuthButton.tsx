"use client";
import React from "react";

export default function OAuthButton({
  logo,
  text,
  redirectUrl,
  color,
  fontColor,
}: {
  logo: JSX.Element;
  text: string;
  redirectUrl: string;
  color: string;
  fontColor: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = redirectUrl;
      }}
      className={`flex w-full justify-center items-center ${fontColor} ${color} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 gap-2 text-center`}
    >
      <div className="w-8 h-8 flex items-center justify-center">{logo}</div>
      {text}
    </button>
  );
}
