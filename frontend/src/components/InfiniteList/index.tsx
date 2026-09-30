import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";
import type { HeaderButtonConfig } from "../PagedTable";
import { useInfiniteListQuery } from "./hook";
import { LuSearch } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";

interface InfiniteListProps<T> {
  service: IBaseGetPagedService<T>;
  queryKey: string;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  headerButtons?: HeaderButtonConfig[];
  pageSize?: number;
  emptyComponent?: React.ReactNode;
  maxHeight?: string;
  skeletonCount?: number;
  title?: string;
  getItemKey?: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function InfiniteList<T>({
  service,
  queryKey,
  hasSearch,
  searchPlaceholder,
  headerButtons,
  pageSize = 20,
  emptyComponent,
  maxHeight = "75vh",
  skeletonCount = 6,
  title,
  getItemKey,
  renderItem,
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
      <div className="flex items-center justify-between gap-4 pr-4">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}

        <div className="ml-auto flex w-full max-w-md items-center justify-end gap-2">
          {headerButtons?.map((btn, i) => (
            <Button key={i} variant={btn.variant ?? "default"} onClick={btn.onClick}>
              {btn.icon}
              {btn.label}
            </Button>
          ))}

          {hasSearch && (
            <div className="relative w-full max-w-sm">
              <LuSearch className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder || t("general.table.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-8"
              />
            </div>
          )}
        </div>
      </div>

      <ul
        className="grid grid-cols-1 gap-3 overflow-y-auto overflow-x-hidden pr-2 md:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent"
        style={{ maxHeight }}
      >
        {isLoading ? (
          Array.from({ length: skeletonCount }).map((_, i) => (
            <li key={`skeleton-${i}`}>
              <Skeleton className="h-36 w-full" />
            </li>
          ))
        ) : isError ? (
          <li className="col-span-full py-8 text-center text-destructive">
            {t("general.table.errorMessage")}
          </li>
        ) : data.length === 0 ? (
          <li className="col-span-full py-8 text-center text-muted-foreground">
            {emptyComponent ?? t("general.table.emptyMessage")}
          </li>
        ) : (
          data.map((item, index) => (
            <li key={getItemKey ? getItemKey(item, index) : index}>{renderItem(item, index)}</li>
          ))
        )}

        {hasNextPage && (
          <li ref={sentinelRef} className="col-span-full flex justify-center py-4">
            {isFetchingNextPage && <Skeleton className="h-8 w-24" />}
          </li>
        )}
      </ul>
    </div>
  );
}
