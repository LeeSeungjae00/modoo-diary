"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Oauth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { provider } = useParams();
  const code = searchParams.get("code") as string;
  const flag = useRef(false);

  useEffect(() => {
    if (flag.current) return;
    flag.current = true;
    const loginAsync = async () => {
      const result = await signIn(`oauth-credential`, {
        redirect: false,
        code,
        platform: provider,
      });
      result?.ok && router.push("/diaries");
      result?.error && router.push("/auth/login");
    };
    loginAsync();

    return () => {
      flag.current = true;
    };
  }, [router, code, provider]);

  return null;
}
