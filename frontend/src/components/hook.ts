import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

interface UsePagedQueryOptions {
  queryKey: string;
  initialPageSize?: number;
}

export function usePagedQuery<T>(service: IBaseGetPagedService<T>, options: UsePagedQueryOptions) {
  const { queryKey, initialPageSize = 10 } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");

  const params: PagedParamsQuery = {
    currentPage,
    pageSize,
    search: search || undefined,
  };

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [queryKey, "paged", params],
    queryFn: async () => {
      const response = await service.execute(params);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    placeholderData: (previousData) => previousData,
  });

  const paging = data?.pagingInformation;

  return {
    data: data?.result ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage: paging?.currentPage ?? currentPage,
    hasPrevious: paging?.hasPrevious ?? false,
    hasNext: paging?.hasNext ?? false,
    isLoading,
    isFetching,
    isError,
    search,
    setSearch,
    goToPage: setCurrentPage,
    nextPage: () => setCurrentPage((p) => (paging?.hasNext ? p + 1 : p)),
    previousPage: () => setCurrentPage((p) => (paging?.hasPrevious ? p - 1 : p)),
  };
}
