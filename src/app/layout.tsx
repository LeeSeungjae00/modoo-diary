import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ReactQueryProvider from "./reactQueryProvider";
import { AuthContextProvider } from "@/context/authInfo.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "modoo diary",
  description: "모두의 다이어리",
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
      </Head>
      <body className={inter.className}>
        <AuthContextProvider>
          <Header></Header>
          <div className="max-w-5xl mx-auto w-screen h-screen">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
