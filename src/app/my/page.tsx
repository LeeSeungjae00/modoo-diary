"use client";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postSignUp } from "@/api/auth";
import { AccessTokenPayload, SignUpFormType } from "@/types/auth";
import { useRouter } from "next/navigation";
import InputAlert from "@/components/common/inputAlert";
import Radio from "@/components/common/radio";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContext } from "@/context/authInfo.context";
import { API_ROUTE_MY_INFO } from "@/constants/api/members";
import {
  getMyInfo,
  getMyInfoSSR,
  patcNickname,
  patchEmail,
  patchRegion,
} from "@/api/members";
import FormContentSkeleton from "@/components/common/formContentSkeleton";
import apiClient, { reissue } from "@/api/modooClient";
import { API_ROUTE_AUTH_REISSUE } from "@/constants/api/auth";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  setAuthToken,
} from "@/lib/authUtill";
import jwtDecode from "jwt-decode";
import { ToastContainer, Zoom, toast } from "react-toastify";

export default function My() {
  const [errorMessage, setErrorMessage] = useState<string>("");
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
  const { state, dispatch } = useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: [API_ROUTE_MY_INFO, state.isLogin?.sub],
    queryFn: getMyInfo(state.isLogin?.sub || ""),
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
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (refreshToken) {
        reissue({
          accessToken,
          refreshToken,
        }).then((res) => {
          const { accessToken: newAccessToken } = res.data.data;
          const payload = jwtDecode<AccessTokenPayload>(newAccessToken);
          dispatch({ type: "SIGNIN", payload });
          toast(<p className="text-center">지역이 변경되었습니다.</p>);
        });
      }
    },
    onError: (error: any) => {
      // console.log();
      setErrorMessage(error?.response?.data.error.code || "");
    },
  });

  const { mutate: updateEmail } = useMutation({
    mutationFn: patchEmail,
    onSuccess: () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (refreshToken) {
        reissue({
          accessToken,
          refreshToken,
        }).then((res) => {
          const { accessToken: newAccessToken } = res.data.data;
          const payload = jwtDecode<AccessTokenPayload>(newAccessToken);
          dispatch({ type: "SIGNIN", payload });
          toast(<p className="text-center">이메일이 변경되었습니다.</p>);
        });
      }
    },
    onError: (error: any) => {
      // console.log();
      setErrorMessage(error?.response?.data.error.code || "");
    },
  });

  const { mutate: updateNickname } = useMutation({
    mutationFn: patcNickname,
    onSuccess: () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (refreshToken) {
        reissue({
          accessToken,
          refreshToken,
        }).then((res) => {
          const { accessToken: newAccessToken } = res.data.data;
          const payload = jwtDecode<AccessTokenPayload>(newAccessToken);
          dispatch({ type: "SIGNIN", payload });
          toast(<p className="text-center">닉네임이 변경되었습니다.</p>);
        });
      }
    },
    onError: (error: any) => {
      // console.log();
      setErrorMessage(error?.response?.data.error.code || "");
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
                  if (state.isLogin?.sub) {
                    updateEmail({
                      memberId: state.isLogin.sub,
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
                  if (state.isLogin?.sub) {
                    updateNickname({
                      memberId: state.isLogin.sub,
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
              <button
                title="닉네임 수정하기"
                type="button"
                className="text-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  if (state.isLogin?.sub) {
                    updateRegion({
                      memberId: state.isLogin.sub,
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
        <ToastContainer
          position="bottom-center"
          autoClose={500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          transition={Zoom}
          draggable={false}
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
