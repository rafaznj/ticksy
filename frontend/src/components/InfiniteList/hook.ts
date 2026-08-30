import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import { useDebouncedValue } from "@/hooks/use-debounce-value";

interface UseInfiniteListQueryOptions {
  queryKey: string;
  pageSize?: number;
  searchDebounceMs?: number;
}

export function useInfiniteListQuery<T>(
  service: IBaseGetPagedService<T>,
  options: UseInfiniteListQueryOptions,
) {
  const { queryKey, pageSize = 20, searchDebounceMs = 400 } = options;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);

  const query = useInfiniteQuery({
    queryKey: [queryKey, "infinite", debouncedSearch, pageSize],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params: PagedParamsQuery = {
        currentPage: pageParam,
        pageSize,
        search: debouncedSearch || undefined,
      };

      const response = await service.execute(params);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < (lastPage.totalPages ?? 0) ? allPages.length + 1 : undefined,
    placeholderData: (previousData) => previousData,
  });

  const data = query.data?.pages.flatMap((page) => page.result) ?? [];

  return {
    data,
    totalCount: query.data?.pages[0]?.totalCount ?? 0,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    hasNextPage: !!query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    search,
    setSearch,
  };
}
