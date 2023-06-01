import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ReactQueryProvider from "./reactQueryProvider";
import { AuthContextProvider } from "@/context/authInfo.context";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

{
  /* <meta name="title" content="모두의 일기">
<meta name="description" content="누구나 작성할 수 있는 모두의 일기">
<meta name="keywords" content="일기, 모두, 모두의 일기, daily, diary, funny, 모두의 일기장, 일기장, everyone diary, moodo, everybody diary">
<meta name="robots" content="index, follow">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="English"></meta> */
}

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthContextProvider>
          <Header></Header>
          <div className="max-w-5xl mx-auto w-screen min-h-screen">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
