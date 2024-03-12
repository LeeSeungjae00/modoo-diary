import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/client/common/header";
import ReactQueryProvider from "./reactQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import AuthSessionProvider from "./authSessionProvider";
import React from "react";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모두의 일기",
  description: "모두 다같이 일기를 작성해봐요.",
  keywords: [
    "일기",
    "모두",
    "모두의 일기",
    "daily",
    "diary",
    "funny",
    "모두의 일기장",
    "일기장",
    "everyone diary",
    "moodo",
    "everybody diary",
    "소통",
    "쓸만한",
    "시간 보내기",
    "하루일기장",
    "일기쓰기 좋은 사이트",
    "온라인 일기장",
    "그림일기",
    "온라인 그림일기",
    "어쩔tv",
    "어쩔.tv",
    "일기장 프로그램",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "모두의 일기",
    title: "모두의 일기",
    images: "/static/images/welldone.png",
    description: "모두 다같이 일기를 작성해봐요.",
    url: "https://xn--oh5bq8f.tv/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7948031195682590"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <AuthSessionProvider>
          <Header></Header>
          <div className="max-w-5xl mx-auto w-screen min-h-screen">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </AuthSessionProvider>
        <Analytics></Analytics>
      </body>
    </html>
  );
}
