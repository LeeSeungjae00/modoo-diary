import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import DiaryDiv from "@/components/diaryDiv";
import { DiaryDivType } from "@/types/diary";
import InfiniteDiary from "@/components/infiniteDiary";

export type Products = {
  products: number[];
};

async function getFisrtDiaries() {
  const res = await fetch(
    `http://mingky.me:22001${API_ROUTE_DIARIES_GET}?offset=0`
  );
  return res.json();
}

export default async function Home() {
  const { data: ssrData } = await getFisrtDiaries();

  return (
    <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-8 pt-28 ">
      {ssrData.content.map((diary: DiaryDivType) => {
        return <DiaryDiv key={diary.id} {...diary}></DiaryDiv>;
      })}
      <InfiniteDiary></InfiniteDiary>
    </main>
  );
}
