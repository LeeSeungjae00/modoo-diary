import { deletedDiary } from "@/api/diary";
import { API_ROUTE_DIARIES_GET } from "@/constants/api/diary";
import { DiaryPageType, InfinitiScrollDataType } from "@/types/diary";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
};

export default useRemoveMutation;
