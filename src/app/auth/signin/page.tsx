"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

type Login = {
  loginId: string;
  password: string;
  nickName: string;
  region: "SEOUL" | "BUSAN" | "INCHEON" | "ULSAN" | "GWANGJU";
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmitLogin(data: FieldValues) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            모두의 일기에 가입하세요
          </h1>
          <form
            onSubmit={handleSubmit(onSubmitLogin, (data) => {
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
              <small className="text-red-500" role="alert">
                {errors.loginId.message as string}
              </small>
            )}
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /^[a-z0-9@.]{4,30}$/,
                    message:
                      "비밀번호는 4자에서 30자까지 영어, 숫자, 특수문자로 이루어져야 합니다.",
                  },
                })}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <small className="text-red-500" role="alert">
                {errors.password.message as string}
              </small>
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
              <small className="text-red-500" role="alert">
                {errors.nickName.message as string}
              </small>
            )}
            <div>
              <Label htmlFor="region">지역</Label>
              <ul
                id="region"
                className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      {...register("region", {
                        required: "지역을 선택해 주세요",
                      })}
                      type="radio"
                      value="SEOUL"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-SEOUL"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      서울{" "}
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      {...register("region", {
                        required: "지역을 선택해 주세요",
                      })}
                      type="radio"
                      value="BUSAN"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-BUSAN"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      부산
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      {...register("region", {
                        required: "지역을 선택해 주세요",
                      })}
                      type="radio"
                      value="INCHEON"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-INCHEON"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      인천
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      {...register("region", {
                        required: "지역을 선택해 주세요",
                      })}
                      type="radio"
                      value="ULSAN"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-ULSAN"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      울산
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      {...register("region", {
                        required: "지역을 선택해 주세요",
                      })}
                      type="radio"
                      value="GWANGJU"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="radio-GWANGJU"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      광주
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            {errors.region && (
              <small className="text-red-500" role="alert">
                {errors.region.message as string}
              </small>
            )}
            {/* <div className="flex items-center justify-between">
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
            </div> */}
            <button
              type="submit"
              className="w-full text-blue-800 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              일기 쓰러 가기
            </button>
            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              계정이 없으신가요?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                회원 가입
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
