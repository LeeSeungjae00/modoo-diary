import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ReactQueryProvider from "./reactQueryProvider";
import { AuthContextProvider } from "@/context/authInfo.context";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모두의 일기",
  description: "모두 다같이 일기를 작성해봐요.",
  openGraph: {
    title: "모두의 일기",
    images: "/static/images/welldone.png",
    description: "모두 다같이 일기를 작성해봐요.",
    url: "https://modoo-diary.vercel.app/",
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
