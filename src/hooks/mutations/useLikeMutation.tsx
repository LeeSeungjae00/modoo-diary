import { putDiaryLike } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikeMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putDiaryLike,
    onMutate: async ({ diaryId }) => {
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
              (val) => val.id === diaryId
            );
            if (findedIndex > -1) {
              const newdata = page.data.map((val) => {
                if (val.id === diaryId) {
                  console.log("teswt");
                  return {
                    ...val,
                    recommendCount: val.recommendCount + 1,
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
          return index === refetchIndex;
        },
      });
    },
  });
};

export default useLikeMutation;
