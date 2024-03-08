import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/server/common/header";
import ReactQueryProvider from "./reactQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import AuthSessionProvider from "./authSessionProvider";

const inter = Inter({ subsets: ["latin"] });

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
          {/* @ts-expect-error Async Server Component */}
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
