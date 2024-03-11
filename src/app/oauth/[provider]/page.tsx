"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect } from "react";

export default async function Oauth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { provider } = useParams();
  const code = searchParams.get("code") as string;

  useEffect(() => {
    const loginAsync = async () => {
      const result = await signIn(`${provider}-credential`, {
        redirect: false,
        code,
      });
      result?.ok && router.push("/diaries");
      router.push("/auth/login");
    };
    loginAsync();
  }, [router, code, provider]);

  return <></>;
}
