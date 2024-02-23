"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputAlert from "@/components/common/inputAlert";
import Radio from "@/components/common/radio";
import { API_ROUTE_MY_INFO } from "@/constants/api/members";
import {
  getMyInfo,
  patcNickname,
  patchEmail,
  patchRegion,
} from "@/api/members";
import FormContentSkeleton from "@/components/common/formContentSkeleton";
import { signIn, useSession } from "next-auth/react";

export default function My() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<{
    region: string;
    nickName: string;
    email: string;
  }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_ROUTE_MY_INFO, session?.user.id],
    queryFn: getMyInfo(session?.user.id.toString() || ""),
    select: (res) => res.data.data,
    onSuccess: (data) => {
      setValue("nickName", data.nickName);
      setValue("email", data.email);
      setValue("region", data.region);
    },
  });

  const { mutate: updateRegion } = useMutation({
    mutationFn: patchRegion,
    onSuccess: () => {
      setSuccessMessage("지역이 변경되었습니다");
      signIn("token-reissue-credential", {
        accessToken: session?.user.accessToken,
        refreshToken: session?.user.refreshToken,
        redirect: false,
      });
      setErrorMessage("");
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
      signIn("token-reissue-credential", {
        accessToken: session?.user.accessToken,
        refreshToken: session?.user.refreshToken,
        redirect: false,
      });
      setErrorMessage("");
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data.error.code || "");
    },
  });

  const { mutate: updateNickname } = useMutation({
    mutationFn: patcNickname,
    onSuccess: () => {
      setSuccessMessage("닉네임이 변경되었습니다");
      signIn("token-reissue-credential", {
        accessToken: session?.user.accessToken,
        refreshToken: session?.user.refreshToken,
        redirect: false,
      });
      setErrorMessage("");
    },
    onError: (error: any) => {
      console.log(error);
      setErrorMessage(error?.response?.data.error || "");
    },
  });

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        내 정보를 수정하세요
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div>
          <Label htmlFor="nickName">이메일</Label>
          {isLoading ? (
            <FormContentSkeleton></FormContentSkeleton>
          ) : (
            <div className="flex">
              <Input
                {...register("email", { required: "이메일을 입력해주세요" })}
                placeholder="name@company.com"
              />
              <button
                title="이메일 수정하기"
                type="button"
                className="text-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  if (session) {
                    updateEmail({
                      memberId: session.user.id.toString(),
                      email: getValues("email"),
                    });
                  }
                }}
              >
                <span className="w-5 h-5">💾</span>
              </button>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="nickName">닉네임</Label>
          {isLoading ? (
            <FormContentSkeleton></FormContentSkeleton>
          ) : (
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
          )}
        </div>
        {errors.nickName && (
          <InputAlert message={errors.nickName.message as string}></InputAlert>
        )}
        <div>
          <Label htmlFor="region">지역</Label>
          {isLoading ? (
            <FormContentSkeleton></FormContentSkeleton>
          ) : (
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
          )}
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
    </div>
  );
}
