import Card from "@/components/server/common/Card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hold() {
  return (
    <Card>
      <div className="flex items-center justify-cente flex-col p-2 gap-4">
        <Image
          src={"https://i.ibb.co/BqXbm7X/blob.png"}
          width={300}
          height={200}
          alt="회원가입을 축하드립니다."
        />
        <h4 className="text-xl font-Chilgok">
          모두의 일기에 가입을 환영합니다. <br />
          로그인 후 다양한 일기를 작성해 보세요.
        </h4>
        <button
          type="submit"
          className="w-full text-blue-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <Link href="/auth/login">로그인하고 일기쓰러 가기</Link>
        </button>
      </div>
    </Card>
  );
}
