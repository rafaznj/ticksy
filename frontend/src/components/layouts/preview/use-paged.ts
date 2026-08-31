import { useEffect, useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import type { PreviewTicket } from "@/components/layouts/preview/types";

interface UsePreviewPagedQueryOptions {
  pageSize?: number;
  statusFilter?: PreviewTicket["status"] | "all";
}

export function usePreviewPagedQuery(
  tickets: PreviewTicket[],
  options: UsePreviewPagedQueryOptions = {},
) {
  const { pageSize: initialPageSize = 5, statusFilter = "all" } = options;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const filtered = useMemo(() => {
    let result =
      statusFilter === "all" ? tickets : tickets.filter((ticket) => ticket.status === statusFilter);

    const term = search.trim().toLowerCase();
    if (term) {
      result = result.filter((ticket) => ticket.title.toLowerCase().includes(term));
    }

    const sort = sorting[0];
    if (sort) {
      result = [...result].sort((a, b) => {
        const aValue = String(a[sort.id as keyof PreviewTicket] ?? "");
        const bValue = String(b[sort.id as keyof PreviewTicket] ?? "");
        const compared = aValue.localeCompare(bValue);
        return sort.desc ? -compared : compared;
      });
    }

    return result;
  }, [tickets, search, sorting, statusFilter]);

  return {
    data: filtered,
    search,
    pageSize,
    currentPage,
    totalPages: Math.ceil(filtered.length / pageSize),
    hasPrevious: currentPage > 1,
    hasNext: currentPage < Math.ceil(filtered.length / pageSize),
    setSorting,
    setSearch,
    setPageSize,
    nextPage: () =>
      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filtered.length / pageSize))),
    previousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
  };
}
