import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SortingState, Updater } from "@tanstack/react-table";
import { AppError } from "@/shared/errors/app-error";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import { useDebouncedValue } from "@/components/PagedTable/use-debounce-value";

interface UsePagedQueryOptions {
  queryKey: string;
  initialPageSize?: number;
  searchDebounceMs?: number;
}

export function usePagedQuery<T>(service: IBaseGetPagedService<T>, options: UsePagedQueryOptions) {
  const { queryKey, initialPageSize = 10, searchDebounceMs = 400 } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pageSize, sorting]);

  const sort = sorting[0];

  const params: PagedParamsQuery = {
    currentPage,
    pageSize,
    search: debouncedSearch || undefined,
    sort: sort?.id,
    order: sort ? (sort.desc ? "desc" : "asc") : undefined,
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

  const onSortingChange = (updater: Updater<SortingState>) => {
    setSorting((prev) => (typeof updater === "function" ? updater(prev) : updater));
  };

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
    sorting,
    onSortingChange,
    pageSize,
    setPageSize,
    goToPage: setCurrentPage,
    nextPage: () => setCurrentPage((p) => (paging?.hasNext ? p + 1 : p)),
    previousPage: () => setCurrentPage((p) => (paging?.hasPrevious ? p - 1 : p)),
  };
}
