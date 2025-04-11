import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/client/common/header";
import ReactQueryProvider from "./reactQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import AuthSessionProvider from "./authSessionProvider";
import React from "react";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import GlobalStyles from "./GlobalStyles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모두의 일기",
  description: "모두 다같이 일기를 작성해봐요.",
  verification: {
    // <meta name="google-site-verification" content="rcBK8GQfgH1ujGDFpL0nizj5HANdK3z9pO1QKTydIp0" />
    google:
      "google-site-verification=rcBK8GQfgH1ujGDFpL0nizj5HANdK3z9pO1QKTydIp0",
  },
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
    url: "https://modoo-diary.vercel.app",
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
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        ></script>
      </head>
      <body className={inter.className}>
        <GlobalStyles />
        <AuthSessionProvider>
          <Header></Header>
          <div className="max-w-5xl mx-auto w-screen min-h-screen">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </AuthSessionProvider>
        <Analytics></Analytics>
        <GoogleAnalytics gaId="G-8K3YSX8579" />
        <amp-auto-ads
          type="adsense"
          data-ad-client="ca-pub-7948031195682590"
        ></amp-auto-ads>
      </body>
    </html>
  );
}
