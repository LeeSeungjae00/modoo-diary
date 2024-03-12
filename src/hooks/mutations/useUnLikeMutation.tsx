import { putDiaryUnLike, putDiaryUnLikeV2 } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUnLikeMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putDiaryUnLikeV2,
    onMutate: async ({ diaryId }) => {
      await queryClient.cancelQueries({ queryKey: [API_ROUTE_DIARIES_GET] });

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

export default useUnLikeMutation;
