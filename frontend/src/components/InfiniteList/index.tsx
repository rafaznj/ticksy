import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import type { HeaderButtonConfig } from "../PagedTable";
import { useInfiniteListQuery } from "./hook";

interface InfiniteListProps<T> {
  service: IBaseGetPagedService<T>;
  queryKey: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  headerButtons?: HeaderButtonConfig[];
  pageSize?: number;
  emptyComponent?: React.ReactNode;
  maxHeight?: string;
  skeletonCount?: number;
  getItemKey?: (item: T, index: number) => string;
}

export function InfiniteList<T>({
  service,
  queryKey,
  renderItem,
  hasSearch,
  searchPlaceholder,
  headerButtons,
  pageSize = 20,
  emptyComponent,
  maxHeight = "75vh",
  skeletonCount = 6,
  getItemKey,
}: InfiniteListProps<T>) {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
    search,
    setSearch,
  } = useInfiniteListQuery<T>(service, { queryKey, pageSize });

  const sentinelRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        {headerButtons && headerButtons.length > 0 && (
          <div className="flex items-center gap-2">
            {headerButtons.map((btn, i) => (
              <Button key={i} variant={btn.variant ?? "default"} onClick={btn.onClick}>
                {btn.icon}
                {btn.label}
              </Button>
            ))}
          </div>
        )}

        {hasSearch && (
          <Input
            placeholder={searchPlaceholder || t("general.table.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto max-w-sm"
          />
        )}
      </div>

      <ul
        className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden pr-2"
        style={{ maxHeight }}
      >
        {isLoading ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <li key={`skeleton-${i}`}>
              <Skeleton className="h-14 w-full" />
            </li>
          ))
        ) : isError ? (
          <li className="py-8 text-center text-destructive">{t("general.table.errorMessage")}</li>
        ) : data.length === 0 ? (
          <li className="py-8 text-center text-muted-foreground">
            {emptyComponent ?? t("general.table.emptyMessage")}
          </li>
        ) : (
          data.map((item, index) => (
            <li key={getItemKey ? getItemKey(item, index) : index}>{renderItem(item, index)}</li>
          ))
        )}

        {hasNextPage && (
          <li ref={sentinelRef} className="flex justify-center py-4">
            {isFetchingNextPage && <Skeleton className="h-8 w-24" />}
          </li>
        )}
      </ul>
    </div>
  );
}
