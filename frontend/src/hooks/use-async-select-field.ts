import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldContext } from "@/hooks/use-form";
import { useDebouncedValue } from "@/hooks/use-debounce-value";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import { AppError } from "@/shared/errors/app-error";

interface Option {
  value: string;
  label: string;
}

interface UseAsyncSelectFieldProps<T> {
  service: IBaseGetPagedService<T>;
  bindValue: keyof T;
  bindLabel: keyof T;
  pageSize?: number;
  searchDebounceMs?: number;
  initialOption?: Option;
}

export function useAsyncSelectField<T>({
  service,
  bindValue,
  bindLabel,
  pageSize = 20,
  searchDebounceMs = 400,
  initialOption,
}: UseAsyncSelectFieldProps<T>) {
  const field = useFieldContext<string>();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(initialOption?.label ?? null);

  const debouncedSearch = useDebouncedValue(search, searchDebounceMs);
  const requestIdRef = useRef(0);

  const mapToOption = useCallback(
    (item: T): Option => ({
      value: String(item[bindValue]),
      label: String(item[bindLabel]),
    }),
    [bindValue, bindLabel],
  );

  const loadPage = useCallback(
    async (page: number, searchTerm: string, append: boolean) => {
      const requestId = ++requestIdRef.current;
      setIsLoading(true);

      try {
        const response = await service.execute({
          currentPage: page,
          pageSize,
          search: searchTerm || undefined,
        });

        if (response instanceof AppError) throw response;
        if (requestId !== requestIdRef.current) return;

        const mapped = response.result.map(mapToOption);

        setOptions((prev) => (append ? [...prev, ...mapped] : mapped));
        setHasMore(page < (response.totalPages ?? 1));
        setCurrentPage(page);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [service, pageSize, mapToOption],
  );

  useEffect(() => {
    if (!open) return;
    loadPage(1, debouncedSearch, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debouncedSearch]);

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    loadPage(currentPage + 1, debouncedSearch, true);
  };

  const handleSelect = (option: Option) => {
    field.handleChange(option.value);
    field.handleBlur();
    setSelectedLabel(option.label);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      field.handleBlur();
    } else {
      setSearch("");
    }
  };

  return {
    field,
    open,
    onOpenChange: handleOpenChange,
    search,
    setSearch,
    options,
    isLoading,
    hasMore,
    loadMore,
    selectedLabel,
    handleSelect,
  };
}
