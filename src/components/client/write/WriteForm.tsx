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
import Canvas from "@/components/client/write/Canvas";
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

export default function WriteForm() {
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
    },
    onError: () => {
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

    try {
      if (isDrawAble) {
        const canvasData = await uploadCanvasData();
        resp = {
          ...resp,
          drawing: canvasData,
        };
      }
      write(resp);
    } catch (error) {
      console.log("그림 업로드 실패");
      setIsLoading(false);
    }
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
    
  );
}
