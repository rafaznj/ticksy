import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
  type Updater,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Minus, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface ActionVisibility<T> {
  edit?: (row: T) => boolean;
  deactivate?: (item: T) => boolean;
  delete?: (row: T) => boolean;
}

interface ActionsConfig<T> {
  headerName?: string;
  visibilityAction?: ActionVisibility<T>;
  disableAction?: ActionVisibility<T>;
  edit?: (item: T) => void;
  deactivate?: (item: T) => void;
  delete?: (item: T) => void;
}

interface PagedTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  search: string;
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  isLoading?: boolean;
  isError?: boolean;
  actions?: ActionsConfig<T>;
  sorting?: SortingState;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  headerButton?: { label: string; onClick: () => void };
  onPageSizeChange?: (size: number) => void;
  onSearchChange: (value: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  getRowId?: (row: T) => string;
  onSortingChange?: (updater: Updater<SortingState>) => void;
}

export function PagedTable<T>({
  columns,
  data,
  search,
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  isLoading,
  isError,
  actions,
  sorting,
  pageSize,
  rowsPerPageOptions = [10, 25, 50, 100],
  headerButton,
  onSearchChange,
  onNextPage,
  onPreviousPage,
  getRowId,
  onSortingChange,
  onPageSizeChange,
}: PagedTableProps<T>) {
  const { t } = useTranslation();
  const columnsWithActions = useMemo<ColumnDef<T>[]>(() => {
    if (!actions) return columns;

    return [
      ...columns,
      {
        id: "actions",
        header: actions.headerName ?? t("general.table.header.actions"),
        enableSorting: false,
        cell: ({ row }: { row: Row<T> }) => {
          const item = row.original;

          const showEdit = actions.edit && actions.visibilityAction?.edit?.(item) !== false;
          const showDeactivate =
            actions.deactivate && actions.visibilityAction?.deactivate?.(item) !== false;
          const showDelete = actions.delete && actions.visibilityAction?.delete?.(item) !== false;

          if (!showEdit && !showDeactivate && !showDelete) return null;

          return (
            <div className="flex items-center gap-1">
              {showEdit && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer rounded-md bg-muted text-amber-600 hover:bg-muted/80 hover:text-amber-700"
                        disabled={actions.disableAction?.edit?.(item)}
                        onClick={() => actions.edit!(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("general.actions.edit")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showDeactivate && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer rounded-md bg-muted text-orange-600 hover:bg-muted/80 hover:text-orange-700"
                        disabled={actions.disableAction?.deactivate?.(item)}
                        onClick={() => actions.deactivate!(item)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("general.actions.deactivate")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showDelete && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer rounded-md bg-muted text-red-600 hover:bg-muted/80 hover:text-red-700"
                        disabled={actions.disableAction?.delete?.(item)}
                        onClick={() => actions.delete!(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("general.actions.delete")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          );
        },
      },
    ];
  }, [actions, columns, t]);

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    getCoreRowModel: getCoreRowModel(),
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
    manualSorting: true,
    onSortingChange,
    state: {
      sorting: sorting ?? [],
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder={t("general.table.searchPlaceholder")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />

        {headerButton && <Button onClick={headerButton.onClick}>{headerButton.label}</Button>}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="flex items-center gap-1 hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDirection === "asc" && <ArrowUp className="h-3.5 w-3.5" />}
                          {sortDirection === "desc" && <ArrowDown className="h-3.5 w-3.5" />}
                          {!sortDirection && <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columnsWithActions.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columnsWithActions.length}
                  className="h-24 text-center text-destructive"
                >
                  {t("general.table.errorMessage")}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columnsWithActions.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {t("general.table.emptyMessage")}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onPageSizeChange && (
            <>
              <span className="text-sm text-muted-foreground">
                {t("general.table.rowsPerPage")}
              </span>
              <Select
                value={String(pageSize ?? rowsPerPageOptions[0])}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="h-8 w-17.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {rowsPerPageOptions.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span>
            {t("general.table.page", {
              current: currentPage,
              total: totalPages || 1,
            })}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={!hasPrevious} onClick={onPreviousPage}>
              {t("general.table.previous")}
            </Button>
            <Button variant="outline" size="sm" disabled={!hasNext} onClick={onNextPage}>
              {t("general.table.next")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
