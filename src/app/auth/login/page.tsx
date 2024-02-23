"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React from "react";
import { useForm } from "react-hook-form";
import { SignInFormType } from "@/types/auth";
import InputAlert from "@/components/common/inputAlert";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();


  async function onSubmitSignUp(data: SignInFormType) {
    await signIn("id-pw-credential", {
      username: data.loginId,
      password: data.password,
    });
  }

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        모두의 일기에 로그인 하세요
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
          <InputAlert message={errors.password.message as string}></InputAlert>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="remember"
                className="text-gray-500 dark:text-gray-300"
              >
                아이디 정보 기억하기
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-blue-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          일기 쓰러 가기
        </button>
        {/* {dataFetchError && (
          <InputAlert message="아이디와 비밀번호를 확인해 주세요."></InputAlert>
        )} */}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          계정이 없으신가요?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            회원 가입
          </Link>
        </p>
      </form>
    </div>
  );
}
