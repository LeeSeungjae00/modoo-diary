import Card from "@/components/server/common/Card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hold() {
  return (
    <Card>
      <div className="flex items-center justify-cente flex-col p-2 gap-6">
        <Image
          src={"https://i.ibb.co/x3rC7dR/blob.png"}
          width={300}
          height={200}
          alt="이메일 인증 실패"
        />
        <h4 className="text-xl font-Chilgok">
          이메일 인증에 실패하였습니다. <br />
          다시 시도해주세요.
        </h4>
        <button
          type="submit"
          className="w-full text-red-400 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <Link href="/auth/signup">회원가입 하러 다시 가기</Link>
        </button>
      </div>
    </Card>
  );
}
