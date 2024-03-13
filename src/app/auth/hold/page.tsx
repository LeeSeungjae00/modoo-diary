import Card from "@/components/server/common/Card";
import Image from "next/image";
import React from "react";

export default function Hold() {
  return (
    <Card>
      <div className="flex items-center justify-cente flex-col p-2 gap-4">
        <Image
          src={"https://i.ibb.co/V38cQLY/blob.png"}
          width={300}
          height={200}
          alt="이메일 인증을 바라는 잠만보"
        />
        <h4 className="text-xl font-Chilgok">
          회원가입 해주셔서 감사합니다. <br />
          이메일을 보냈어요. <br /> 회원가입시 등록한 이메일 함을 확인해 주세요.
        </h4>
      </div>
    </Card>
  );
}
