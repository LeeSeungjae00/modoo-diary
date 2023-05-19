import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ReactQueryProvider from "./reactQueryProvider";
import { AuthContextProvider } from "@/context/authInfo.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "모두의 일기",
  description: "모두 다같이 일기를 작성해봐요.",
  ogImage: "/images/welldone.png",
  ogUrl: "https://modoo-diary.vercel.app/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description}></meta>
        <meta property="og:title" content="모두의 일기"></meta>
        <meta property="og:image" content={metadata.ogImage}></meta>
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.ogUrl}></meta>
      </Head>
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
