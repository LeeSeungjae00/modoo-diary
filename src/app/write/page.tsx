"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { DiaryType } from "@/types/diary";
import InputAlert from "@/components/common/inputAlert";
import { postDiary } from "@/api/diary";
import FontButton from "@/components/common/fontButton";
import useCoordinate from "@/hooks/useCoordinate";

const FontH1 = styled.h1`
  font-family: Chilgok_lws;
`;

const FontTextarea = styled.textarea`
  font-family: Chilgok_lws;
  font-size: 1.5rem;
  ::placeholder {
    font-size: 1.5rem;
  }
`;

export default function Write() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryType>();
  const { mutate: write, isLoading } = useMutation({
    mutationFn: postDiary,
    onSuccess: () => {
      router.push("/");
    },
  });
  const coordinate = useCoordinate();

  function onSubmitWrite(data: DiaryType) {
    if (coordinate.loaded && !coordinate.error) {
      write({
        ...data,
        ...coordinate.coordinates,
      });
    }
    write(data);
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      {isLoading ? (
        <FontH1>참 잘했어요</FontH1>
      ) : (
        <>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <form
              onSubmit={handleSubmit(onSubmitWrite)}
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
            >
              <FontH1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex">
                <p className="min-w-fit">제목:</p>
                <input
                  {...register("title", {
                    required: "제목을 입력해 주세요",
                  })}
                  className="ml-2 focus:border-none"
                  placeholder="즐거운 하루"
                ></input>
              </FontH1>
              {errors.title && (
                <InputAlert
                  message={errors.title.message as string}
                ></InputAlert>
              )}
              <FontTextarea
                {...register("content")}
                placeholder="나는 오늘 일기를 썻다. 재미썻다. 다음에도 또 써야지."
                className="w-full h-56"
              ></FontTextarea>
              <FontButton
                type="submit"
                className="w-full text-blue-800 bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                끄읏.
              </FontButton>
            </form>
          </div>
          {!coordinate.loaded && !coordinate.error && (
            <p className="text-sm text-gray-300 pt-3">
              ℹ️ 브라우저 위치 정보 권한을 수락하면 지금 위치 날씨로 일기를
              써요.
            </p>
          )}
        </>
      )}
    </div>
  );
}
