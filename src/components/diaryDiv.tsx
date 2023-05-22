import {
  DiaryDivType,
  DiaryPageType,
  DiaryType,
  InfinitiScrollDataType,
} from "@/types/diary";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputAlert from "./common/inputAlert";
import { deletedDiary, patchDiary, putDiaryLike } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import FontButton from "./common/fontButton";
import { useRouter } from "next/navigation";

const DiaryCard = styled.div`
  font-family: Chilgok_lws;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 0.5rem;
  background-size: cover;
  margin-bottom: 1.5rem;
  /* border: 1px solid #4e4e4e; */
  background-color: #f2f2f2;
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),
    0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  position: relative;
  padding-bottom: 1.5rem;
`;

const FontPre = styled.pre`
  font-family: Chilgok_lws;
  white-space: pre-wrap;
`;

const WellDoneButton = styled.button`
  background-image: url("/static/images/welldone-removebg-preview.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: transparent;
  &:hover {
    background-color: #a8a8a8c2;
  }
  &:active {
    width: 3.8rem;
    height: 3.8rem;
    margin: 0.1rem;
  }
`;

const WellDoneDiv = styled.div`
  position: absolute;
  transition: rotate(45deg);
  transform: rotate(342deg);
  display: flex;
  bottom: 0.5rem;
  right: 1.5rem;
`;

export default React.memo(function DiaryDiv({
  id,
  nickName,
  createdTime,
  weather,
  title,
  content,
  isLogin,
  recommendCount,
}: DiaryDivType) {
  const [isWrite, setIsWrite] = useState(false);
  const [confilmDelete, setConfilmDelete] = useState(false);
  const queryClient = useQueryClient();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryType>();
  const { mutate: like, isLoading: isLoadingLike } = useMutation({
    mutationFn: putDiaryLike,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [API_ROUTE_DIARIES_GET] });

      const previous = queryClient.getQueryData([API_ROUTE_DIARIES_GET]);

      queryClient.setQueryData<{
        pageParams: undefined | number[];
        pages: InfinitiScrollDataType<DiaryPageType>[];
      }>([API_ROUTE_DIARIES_GET], (old) => {
        if (old) {
          const { pageParams, pages } = old;

          const newPages = pages.map((page) => {
            const findedIndex = page.data.findIndex((val) => val.id === data);

            if (findedIndex > -1) {
              const newdata = page.data.map((val) => {
                if (val.id === data) {
                  return {
                    ...val,
                    recommendCount: ++val.recommendCount,
                  };
                }
                return val;
              });

              return {
                ...page,
                data: newdata,
              };
            }
            return page;
          });

          return {
            pageParams,
            pages: newPages,
          };
        }
      });

      return { previous };
    },
    onError: (_error, _, context) => {
      queryClient.setQueriesData([API_ROUTE_DIARIES_GET], context?.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE_DIARIES_GET],
        refetchPage: (
          lastPage,
          index,
          allPages: InfinitiScrollDataType<DiaryPageType>[]
        ) => {
          const refetchIndex = allPages.findIndex(
            (val) => val.data.findIndex((val) => val.id === id) !== -1
          );
          console.log(refetchIndex);
          return index === refetchIndex;
        },
      });
    },
  });

  const { mutate: write } = useMutation({
    mutationFn: patchDiary,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [API_ROUTE_DIARIES_GET] });

      const previous = queryClient.getQueryData([API_ROUTE_DIARIES_GET]);

      queryClient.setQueryData<{
        pageParams: undefined | number[];
        pages: InfinitiScrollDataType<DiaryPageType>[];
      }>([API_ROUTE_DIARIES_GET], (old) => {
        if (old) {
          const { pageParams, pages } = old;

          const newPages = pages.map((page) => {
            const findedIndex = page.data.findIndex(
              (val) => val.id === data.diaryId
            );

            if (findedIndex > -1) {
              const newdata = page.data.map((val) => {
                if (val.id === data.diaryId) {
                  return {
                    ...val,
                    title: data.title,
                    content: data.content,
                  };
                }
                return val;
              });

              return {
                ...page,
                data: newdata,
              };
            }
            return page;
          });

          return {
            pageParams,
            pages: newPages,
          };
        }
      });

      return { previous };
    },
    onError: (_error, _, context) => {
      queryClient.setQueriesData([API_ROUTE_DIARIES_GET], context?.previous);
    },
    onSuccess: () => {
      setIsWrite(false);

      queryClient.invalidateQueries({
        queryKey: [API_ROUTE_DIARIES_GET],
        refetchPage: (
          lastPage,
          index,
          allPages: InfinitiScrollDataType<DiaryPageType>[]
        ) => {
          const refetchIndex = allPages.findIndex(
            (val) => val.data.findIndex((val) => val.id === id) !== -1
          );
          console.log(refetchIndex);
          return index === refetchIndex;
        },
      });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: deletedDiary,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [API_ROUTE_DIARIES_GET] });

      const previous = queryClient.getQueryData([API_ROUTE_DIARIES_GET]);

      queryClient.setQueryData<{
        pageParams: undefined | number[];
        pages: InfinitiScrollDataType<DiaryPageType>[];
      }>([API_ROUTE_DIARIES_GET], (old) => {
        if (old) {
          const { pageParams, pages } = old;

          const newPages = pages.map((page) => {
            const findedIndex = page.data.findIndex((val) => val.id === data);

            if (findedIndex > -1) {
              const newdata = page.data.filter((val) => val.id !== data);

              return {
                ...page,
                data: newdata,
              };
            }
            return page;
          });

          return {
            pageParams,
            pages: newPages,
          };
        }
      });

      return { previous };
    },
    onError: (_error, _, context) => {
      queryClient.setQueriesData([API_ROUTE_DIARIES_GET], context?.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([API_ROUTE_DIARIES_GET]);
    },
  });

  function onSubmitWrite(data: DiaryType) {
    write({ ...data, diaryId: id });
  }

  function onClickWellDone(diaryId: number) {
    if (isLogin) {
      like(diaryId);
    } else {
      route.push("/auth/login");
    }
  }

  return (
    <DiaryCard key={id}>
      <div className="flex justify-between w-full">
        <div className="flex">
          <p className="text-lg">{nickName}의 일기</p>

          {isLogin?.nickName === nickName && (
            <>
              {isWrite ? (
                <>
                  <button
                    data-tooltip-target="tooltip-update"
                    className="h-fit px-2 border-l-2"
                    title="취소"
                    onClick={() => {
                      setIsWrite(false);
                    }}
                  >
                    🔙
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-tooltip-target="tooltip-update"
                    className="h-fit px-2"
                    title="수정"
                    onClick={() => {
                      setIsWrite(true);
                    }}
                  >
                    ✏️
                  </button>
                  {confilmDelete ? (
                    <p>
                      진짜로 지울거예요?{" "}
                      <button onClick={() => remove(id)}>예</button> /{" "}
                      <button onClick={() => setConfilmDelete(false)}>
                        아니오
                      </button>
                    </p>
                  ) : (
                    <button
                      onClick={() => {
                        setConfilmDelete(true);
                      }}
                      className="h-fit px-2 border-l-2"
                      title="삭제"
                    >
                      ❌
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div>
          <p>
            {format(new Date(createdTime), "yyyy년 M월 d일 EEE", {
              locale: ko,
            })}
            요일
          </p>
          <p className="border-b-2 text-lg border-gray-500">
            오늘날씨 {weather}
          </p>
        </div>
      </div>
      {isWrite ? (
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
                placeholder={title}
                defaultValue={title}
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
                placeholder={content}
                defaultValue={content}
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
      ) : (
        <div className="w-full">
          <p className="pb-1 text-xl border-b-2 border-gray-500">
            <strong>제목 : {title}</strong>
          </p>
          <strong>
            <FontPre className="border-b-2 text-lg border-gray-500">
              {content}
            </FontPre>
          </strong>
          <p className="border-b-2 text-lg border-gray-500 text-end">
            <strong>끄읏.</strong>
          </p>
          <WellDoneDiv>
            <WellDoneButton
              disabled={isLoadingLike}
              onClick={() => onClickWellDone(id)}
            ></WellDoneButton>
            x {recommendCount}
          </WellDoneDiv>
        </div>
      )}
    </DiaryCard>
  );
});
