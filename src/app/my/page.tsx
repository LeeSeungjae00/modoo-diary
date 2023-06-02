"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postSignUp } from "@/api/auth";
import { SignUpFormType } from "@/types/auth";
import { useRouter } from "next/navigation";
import InputAlert from "@/components/common/inputAlert";
import Radio from "@/components/common/radio";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/context/authInfo.context";
import { API_ROUTE_MY_INFO } from "@/constants/api/members";
import { getMyInfo } from "@/api/members";

export default function My() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormType>();
  const { state } = useContext(AuthContext);
  const query = useQuery({
    queryKey: [API_ROUTE_MY_INFO, state.isLogin?.sub],
    queryFn: getMyInfo(state.isLogin?.sub || ""),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: signUp, isError } = useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (error: any) => {
      // console.log();
      setErrorMessage(error?.response?.data.error.code || "");
    },
  });

  function onSubmitSignUp(data: SignUpFormType) {
    signUp(data);
  }

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        내 정보를 수정하세요
      </h1>
      <form
        onSubmit={handleSubmit(onSubmitSignUp, (data) => {
          console.log(data);
        })}
        className="space-y-4 md:space-y-6"
        action="#"
      >
        <div>
          <Label htmlFor="loginId">아이디</Label>
          <Input
            {...register("loginId", {
              required: "아이디를 입력해주세요",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            type="loginId"
            name="loginId"
            id="loginId"
            placeholder="name@company.com"
          />
        </div>
        {errors.loginId && (
          <InputAlert message={errors.loginId.message as string}></InputAlert>
        )}
        {errors.passwordConfirmation && (
          <InputAlert
            message={errors.passwordConfirmation.message as string}
          ></InputAlert>
        )}
        <div>
          <Label htmlFor="nickName">닉네임</Label>
          <Input
            {...register("nickName", { required: "닉네임을 입력해주세요" })}
            type="nickName"
            name="nickName"
            id="nickName"
            placeholder="모두의 일기"
          />
        </div>
        {errors.nickName && (
          <InputAlert message={errors.nickName.message as string}></InputAlert>
        )}
        <div>
          <Label htmlFor="region">지역</Label>
          <Radio
            radioList={[
              {
                inputArg: {
                  value: "SEOUL",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                lable: "서울",
              },
              {
                inputArg: {
                  value: "BUSAN",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                lable: "부산",
              },
              {
                inputArg: {
                  value: "INCHEON",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                lable: "인천",
              },
              {
                inputArg: {
                  value: "ULSAN",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                lable: "울산",
              },
              {
                inputArg: {
                  value: "GWANGJU",
                  ...register("region", {
                    required: "지역을 선택해 주세요",
                  }),
                },
                lable: "광주",
              },
            ]}
          ></Radio>
        </div>
        {errors.region && (
          <InputAlert message={errors.region.message as string}></InputAlert>
        )}
        <button
          type="submit"
          className="w-full text-blue-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          회원가입 하고 로그인 하러 가기
        </button>
        {errorMessage && <InputAlert message={errorMessage}></InputAlert>}
      </form>
    </div>
  );
}
