"use client";
import { patchEmail, patchNickname, patchRegion } from "@/api/members";
import Input from "@/components/common/input";
import InputAlert from "@/components/common/inputAlert";
import Label from "@/components/common/label";
import Radio from "@/components/common/radio";
import { MyInfoType } from "@/types/diary";
import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function MyForm({ region, nickName, email }: MyInfoType) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<{
    region: string;
    nickName: string;
    email: string;
  }>({
    defaultValues: {
      region,
      nickName,
      email,
    },
  });

  const mutateSuccess = () => {
    signIn("token-reissue-credential", {
      accessToken: session?.user.accessToken,
      refreshToken: session?.user.refreshToken,
      redirect: false,
    });
    setErrorMessage("");
  };

  const { mutate: updateRegion } = useMutation({
    mutationFn: patchRegion,
    onSuccess: () => {
      setSuccessMessage("지역이 변경되었습니다");
      mutateSuccess();
    },
    onError: (error: any) => {
      console.log(error);
      setErrorMessage(error?.response?.data.error || "");
    },
  });

  const { mutate: updateEmail } = useMutation({
    mutationFn: patchEmail,
    onSuccess: () => {
      setSuccessMessage("이메일이 변경되었습니다");
      mutateSuccess();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data.error.code || "");
    },
  });

  const { mutate: updateNickname } = useMutation({
    mutationFn: patchNickname,
    onSuccess: () => {
      setSuccessMessage("닉네임이 변경되었습니다");
      mutateSuccess();
    },
    onError: (error: any) => {
      console.log(error);
      setErrorMessage(error?.response?.data.error || "");
    },
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Label htmlFor="nickName">이메일</Label>

        <div className="flex">
          <Input
            {...register("email", { required: "이메일을 입력해주세요" })}
            placeholder="name@company.com"
            disabled
          />
        </div>
      </div>
      {errors.email && (
        <InputAlert message={errors.email.message as string}></InputAlert>
      )}
      <div>
        <Label htmlFor="nickName">닉네임</Label>

        <div className="flex">
          <Input
            {...register("nickName", { required: "닉네임을 입력해주세요" })}
            placeholder="모두의 일기"
          />
          <button
            title="닉네임 수정하기"
            type="button"
            className="text-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              if (session) {
                updateNickname({
                  memberId: session.user.id.toString(),
                  nickName: getValues("nickName"),
                });
              }
            }}
          >
            <span className="w-5 h-5">💾</span>
          </button>
        </div>
      </div>
      {errors.nickName && (
        <InputAlert message={errors.nickName.message as string}></InputAlert>
      )}
      <div>
        <Label htmlFor="region">지역</Label>

        <div className="flex">
          <Radio
            radioList={[
              {
                inputArg: {
                  value: "SEOUL",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                label: "서울",
              },
              {
                inputArg: {
                  value: "BUSAN",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                label: "부산",
              },
              {
                inputArg: {
                  value: "INCHEON",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                label: "인천",
              },
              {
                inputArg: {
                  value: "ULSAN",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                label: "울산",
              },
              {
                inputArg: {
                  value: "GWANGJU",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                label: "광주",
              },
            ]}
          ></Radio>
          <button
            title="닉네임 수정하기"
            type="button"
            className="text-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              if (session) {
                updateRegion({
                  memberId: session.user.id.toString(),
                  region: getValues("region"),
                });
              }
            }}
          >
            <span className="w-5 h-5">💾</span>
          </button>
        </div>
      </div>
      {errors.region && (
        <InputAlert message={errors.region.message as string}></InputAlert>
      )}
      {errorMessage && <InputAlert message={errorMessage}></InputAlert>}
      <br></br>
      {successMessage && (
        <small className="text-blue-500" role="alert">
          {successMessage}
        </small>
      )}
    </div>
  );
}
