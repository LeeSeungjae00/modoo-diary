import { DiaryDivType, DiaryType } from "@/types/diary";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useState } from "react";
import useWriteMutation from "@/hooks/mutations/useWriteMutation";
import FontPre from "./common/fontPre";
import EditButtons from "./editButtons";
import useRemoveMutation from "@/hooks/mutations/useRemoveMutation";
import UpdateDiaryForm from "./updateDiaryForm";
import WellDoneButton from "./wellDoneButton";
import MoreHarderButton from "./moreHarderButton";

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

const DateLabel = styled.p`
  :hover {
    font-size: 0px;
    :after {
      content: attr(data-time);
      font-size: initial;
    }
  }
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
  unlikeCount,
}: DiaryDivType) {
  const [isWrite, setIsWrite] = useState(false);

  const { mutate: remove } = useRemoveMutation();
  const { mutate: write } = useWriteMutation(id);

  const onSubmitWrite = (data: DiaryType) => {
    write(
      { ...data, diaryId: id },
      {
        onSuccess: () => {
          setIsWrite(false);
        },
      }
    );
  };

  return (
    <DiaryCard key={id}>
      <div className="flex justify-between w-full">
        <div className="flex">
          <p className="text-lg">{nickName}의 일기</p>

          {isLogin?.nickName === nickName && (
            <EditButtons
              isWrite={isWrite}
              onUpdate={() => setIsWrite(true)}
              onCancel={() => setIsWrite(false)}
              onDelete={() => remove(id)}
            ></EditButtons>
          )}
        </div>
        <div className="flex flex-col items-end">
          <DateLabel
            data-time={format(new Date(createdTime), " HH시 mm분", {
              locale: ko,
            })}
          >
            {format(new Date(createdTime), "yyyy년 M월 d일 EEE", {
              locale: ko,
            })}
            요일
          </DateLabel>
          <p className="border-b-2 text-lg border-gray-500">
            오늘날씨 {weather}
          </p>
        </div>
      </div>
      {isWrite ? (
        <UpdateDiaryForm
          defaultValue={{
            title,
            content,
          }}
          onSubmitWrite={onSubmitWrite}
        ></UpdateDiaryForm>
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
          <WellDoneButton
            id={id}
            isLogin={isLogin}
            recommendCount={recommendCount}
          ></WellDoneButton>
          <MoreHarderButton
            id={id}
            isLogin={isLogin}
            unlikeCount={unlikeCount}
          ></MoreHarderButton>
        </div>
      )}
    </DiaryCard>
  );
});
