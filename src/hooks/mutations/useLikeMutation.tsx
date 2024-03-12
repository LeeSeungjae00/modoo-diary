import { putDiaryLike, putDiaryLikeV2 } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikeMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putDiaryLikeV2,
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: [API_ROUTE_DIARIES_GET] });

      const previous = queryClient.getQueryData([API_ROUTE_DIARIES_GET]);
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
          return index === refetchIndex;
        },
      });
    },
  });
};

export default useLikeMutation;
