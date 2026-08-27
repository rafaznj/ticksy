import { useMemo, useState } from "react";
import type { SortingState, Updater } from "@tanstack/react-table";
import type { DemoTicket } from "@/components/layouts/demo-preview/types";

interface UseMockPagedQueryOptions {
  pageSize?: number;
}

export function useMockPagedQuery(tickets: DemoTicket[], options: UseMockPagedQueryOptions = {}) {
  const { pageSize: initialPageSize = 5 } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let result = term
      ? tickets.filter((ticket) => ticket.title.toLowerCase().includes(term))
      : tickets;

    const sort = sorting[0];
    if (sort) {
      result = [...result].sort((a, b) => {
        const aValue = String(a[sort.id as keyof DemoTicket] ?? "");
        const bValue = String(b[sort.id as keyof DemoTicket] ?? "");
        const compared = aValue.localeCompare(bValue);
        return sort.desc ? -compared : compared;
      });
    }

    return result;
  }, [tickets, search, sorting]);

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const pageData = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const onSortingChange = (updater: Updater<SortingState>) => {
    setSorting((prev) => (typeof updater === "function" ? updater(prev) : updater));
    setCurrentPage(1);
  };

  return {
    data: pageData,
    totalCount,
    totalPages,
    currentPage: safePage,
    hasPrevious: safePage > 1,
    hasNext: safePage < totalPages,
    isLoading: false,
    isFetching: false,
    isError: false,
    search,
    setSearch: (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    },
    sorting,
    onSortingChange,
    pageSize,
    setPageSize: (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
    },
    goToPage: setCurrentPage,
    nextPage: () => setCurrentPage((p) => (p < totalPages ? p + 1 : p)),
    previousPage: () => setCurrentPage((p) => (p > 1 ? p - 1 : p)),
  };
}
