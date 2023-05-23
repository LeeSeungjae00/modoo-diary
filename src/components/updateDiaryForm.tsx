import React from "react";
import InputAlert from "./common/inputAlert";
import { DiaryType } from "@/types/diary";
import { useForm } from "react-hook-form";
import FontPre from "./common/fontPre";
import FontButton from "./common/fontButton";

export default function UpdateDiaryForm({
  defaultValue,
  onSubmitWrite,
}: {
  defaultValue: Partial<DiaryType>;
  onSubmitWrite: (data: DiaryType) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryType>();

  return (
    <form
      onSubmit={handleSubmit(onSubmitWrite)}
      className="w-full bg-white rounded-md p-2"
    >
      <p className="pb-1 text-xl border-gray-500">
        <strong className="flex">
          <p className="min-w-fit">제목 :</p>
          <input
            {...register("title", {
              required: "제목을 입력해 주세요",
            })}
            placeholder={defaultValue?.title || ""}
            defaultValue={defaultValue?.title || ""}
            className="bg-transparent flex-1 pl-1"
          ></input>
        </strong>
      </p>
      {errors.title && (
        <InputAlert message={errors.title.message as string}></InputAlert>
      )}
      <strong>
        <FontPre className=" text-lg border-gray-500">
          <textarea
            {...register("content")}
            placeholder={defaultValue?.content || ""}
            defaultValue={defaultValue?.content || ""}
            className="w-full bg-transparent"
            rows={10}
          ></textarea>
        </FontPre>
      </strong>
      <p className="text-lg border-gray-500 text-end">
        <FontButton
          type="submit"
          className="w-full text-blue-800 bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          끄읏.
        </FontButton>
      </p>
    </form>
  );
}
