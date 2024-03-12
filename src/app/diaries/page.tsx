import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import InfiniteDiary from "@/components/client/diaries/infiniteDiary";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";

export type Products = {
  products: number[];
};

export const metadata = {
  title: "모두의 일기",
  description: "모두의 일기",
};

async function getFirstDiaries() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_SERVER}/api/diaries?offset=0`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return {
        data: res.data.content,
      };
    });
  return res;
}

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [API_ROUTE_DIARIES_GET],
    queryFn: () => getFirstDiaries(),
  });

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return (
    <main className="flex min-h-screen max-w-screen-lg flex-col items-center p-8 pt-28 ">
      <Hydrate state={dehydratedState}>
        <InfiniteDiary></InfiniteDiary>
      </Hydrate>
    </main>
  );
}
