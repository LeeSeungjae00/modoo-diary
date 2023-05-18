"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "@/api/auth";
import { SignUpFormType } from "@/types/auth";
import { useRouter } from "next/navigation";
import InputAlert from "@/components/common/inputAlert";
import Radio from "@/components/common/radio";
import { AxiosError } from "axios";

export default function SignUp() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>();
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            모두의 일기에 가입하세요
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
              <InputAlert
                message={errors.loginId.message as string}
              ></InputAlert>
            )}
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^[\da-zA-Z!@#]{4,}$/,
                    message: "비밀번호는 최소 4자 이상입니다.",
                  },
                })}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <InputAlert
                message={errors.password.message as string}
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
              <InputAlert
                message={errors.nickName.message as string}
              ></InputAlert>
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
              <InputAlert
                message={errors.region.message as string}
              ></InputAlert>
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
      </div>
    </div>
  );
}
