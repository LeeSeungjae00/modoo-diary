import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import InfiniteDiary from "@/components/infiniteDiary";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";

export type Products = {
  products: number[];
};

async function getFisrtDiaries() {
  const res = await fetch(
    `http://mingky.me:22001${API_ROUTE_DIARIES_GET}?offset=0`,
    { next: { revalidate: 0 } }
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
    queryFn: () => getFisrtDiaries(),
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
