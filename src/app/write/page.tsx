"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { DiaryType } from "@/types/diary";
import InputAlert from "@/components/common/inputAlert";
import { postDiary } from "@/api/diary";
import FontButton from "@/components/common/fontButton";
import useCoordinate from "@/hooks/useCoordinate";
import Canvas from "@/components/canvas";
import axios from "axios";
import dataURItoBlob from "@/lib/dataURItoBlob";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawAble, setIsDrawAble] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryType>();
  const { mutate: write } = useMutation({
    mutationFn: postDiary,
    onSuccess: () => {
      router.push("/");
      setIsLoading(false);
    },
  });
  const coordinate = useCoordinate();

  async function onSubmitWrite(data: DiaryType) {
    setIsLoading(true);
    let resp = data;
    if (coordinate.loaded && !coordinate.error) {
      resp = {
        ...resp,
        ...coordinate.coordinates,
      };
    }

    if (isDrawAble) {
      const canvasData = await uploadCanvasData();
      resp = {
        ...resp,
        drawing: canvasData,
      };
    }
    write(resp);
  }

  async function uploadCanvasData() {
    if (canvasRef.current) {
      const bb = dataURItoBlob(canvasRef.current?.toDataURL());
      var formData = new FormData();
      formData.append("image", bb);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=15552000&key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_TOKEN}`,
        formData
      );

      return {
        displayUrl: res.data.data.display_url,
        deleteUrl: res.data.data.delete_url,
      };
    }
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-32 mx-auto min-h-screen">
      {isLoading ? (
        <FontH1>참 잘했어요</FontH1>
      ) : (
        <>
          <label className="relative inline-flex items-center cursor-pointer mb-2">
            <input
              type="checkbox"
              value=""
              onChange={(e) => setIsDrawAble(!isDrawAble)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              그림일기 쓰기
            </span>
          </label>
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
              {isDrawAble && (
                <div className="flex flex-col justify-center mt-1">
                  <Canvas canvasRef={canvasRef}></Canvas>
                </div>
              )}
              <FontTextarea
                {...register("content")}
                placeholder="나는 오늘 일기를 썻다. 재미썻다. 다음에도 또 써야지."
                className="w-full h-56"
              ></FontTextarea>
              <FontButton
                type="submit"
                className="w-full text-blue-800 bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
