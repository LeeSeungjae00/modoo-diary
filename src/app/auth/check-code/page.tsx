import { RedirectType, redirect } from "next/navigation";
import React from "react";

const fetchCode = async (code: string) => {
  console.log(code);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_SERVER}/api/auth/check-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );

  return await res.json();
};

export default async function page({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const res = await fetchCode(searchParams.code);
  console.log(res);
  if (res.data) {
    redirect("/auth/success", RedirectType.replace);
  } else {
    redirect("/auth/fail");
  }
}
