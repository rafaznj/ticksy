import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SortingState, Updater } from "@tanstack/react-table";
import { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import { useDebouncedValue } from "@/hooks/use-debounce-value";

interface UsePagedQueryOptions {
  queryKey: string;
  initialPageSize?: number;
  searchDebounceMs?: number;
  filters?: Record<string, unknown>;
}

export function usePagedQuery<T>(service: IBaseGetPagedService<T>, options: UsePagedQueryOptions) {
  const { queryKey, initialPageSize = 10, searchDebounceMs = 400, filters = {} } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pageSize, sorting, filters]);

  const sort = sorting[0];

  const params: PagedParamsQuery = {
    currentPage,
    pageSize,
    search: debouncedSearch || undefined,
    sort: sort?.id,
    order: sort ? (sort.desc ? "desc" : "asc") : undefined,
    ...filters,
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

  const totalPages = data?.totalPages ?? 0;

  const onSortingChange = (updater: Updater<SortingState>) => {
    setSorting((prev) => (typeof updater === "function" ? updater(prev) : updater));
  };

  return {
    data: data?.result ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages,
    currentPage,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    isLoading,
    isFetching,
    isError,
    search,
    setSearch,
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    goToPage: setCurrentPage,
    nextPage: () => setCurrentPage((p) => (p < totalPages ? p + 1 : p)),
    previousPage: () => setCurrentPage((p) => (p > 1 ? p - 1 : p)),
  };
}
