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
import {
  LuArrowDown,
  LuArrowUp,
  LuArrowUpDown,
  LuCheck,
  LuPencil,
  LuTrash2,
  LuUserCheck,
  LuUserMinus,
  LuUserPlus,
  LuUserX,
} from "react-icons/lu";

type TooltipValue<T> = string | ((item: T) => string);

interface ActionVisibility<T> {
  edit?: (row: T) => boolean;
  activate?: (item: T) => boolean;
  deactivate?: (item: T) => boolean;
  delete?: (row: T) => boolean;
  assign?: (item: T) => boolean;
  unassign?: (item: T) => boolean;
  resolved?: (item: T) => boolean;
}

interface ActionsConfig<T> {
  headerName?: string;
  visibilityAction?: ActionVisibility<T>;
  disableAction?: ActionVisibility<T>;
  tooltips?: {
    edit?: TooltipValue<T>;
    activate?: TooltipValue<T>;
    deactivate?: TooltipValue<T>;
    delete?: TooltipValue<T>;
    assign?: TooltipValue<T>;
    unassign?: TooltipValue<T>;
    resolved?: TooltipValue<T>;
  };
  edit?: (item: T) => void;
  activate?: (item: T) => void;
  deactivate?: (item: T) => void;
  delete?: (item: T) => void;
  assign?: (item: T) => void;
  unassign?: (item: T) => void;
  resolved?: (item: T) => void;
}

export interface HeaderButtonConfig {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

interface FilterConfig {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  allLabel?: string;
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
  headerButtons?: HeaderButtonConfig[];
  filter?: FilterConfig;
  onPageSizeChange?: (size: number) => void;
  onSearchChange: (value: string) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  getRowId?: (row: T) => string;
  onSortingChange?: (updater: Updater<SortingState>) => void;
}

function resolveTooltip<T>(
  tooltip: TooltipValue<T> | undefined,
  item: T,
  fallback: string,
): string {
  if (typeof tooltip === "function") return tooltip(item);
  return tooltip ?? fallback;
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
  headerButtons,
  filter,
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

          const isEditVisible = actions.visibilityAction?.edit?.(item) !== false;
          const isActivateVisible = actions.visibilityAction?.activate?.(item) !== false;
          const isDeactivateVisible = actions.visibilityAction?.deactivate?.(item) !== false;
          const isDeleteVisible = actions.visibilityAction?.delete?.(item) !== false;
          const isAssignVisible = actions.visibilityAction?.assign?.(item) !== false;
          const isUnassignVisible = actions.visibilityAction?.unassign?.(item) !== false;
          const isResolvedVisible = actions.visibilityAction?.resolved?.(item) !== false;

          const showEdit = !!actions.edit && isEditVisible;
          const showActivate = !!actions.activate && isActivateVisible;
          const showDeactivate = !!actions.deactivate && isDeactivateVisible;
          const showDelete = !!actions.delete && isDeleteVisible;
          const showAssign = !!actions.assign && isAssignVisible;
          const showUnassign = !!actions.unassign && isUnassignVisible;
          const showResolved = !!actions.resolved && isResolvedVisible;

          if (
            !showEdit &&
            !showActivate &&
            !showDeactivate &&
            !showDelete &&
            !showAssign &&
            !showUnassign &&
            !showResolved
          ) {
            return null;
          }

          const isEditDisabled = !!actions.disableAction?.edit?.(item);
          const isActivateDisabled = !!actions.disableAction?.activate?.(item);
          const isDeactivateDisabled = !!actions.disableAction?.deactivate?.(item);
          const isDeleteDisabled = !!actions.disableAction?.delete?.(item);
          const isAssignDisabled = !!actions.disableAction?.assign?.(item);
          const isUnassignDisabled = !!actions.disableAction?.unassign?.(item);
          const isResolvedDisabled = !!actions.disableAction?.resolved?.(item);

          return (
            <div className="flex items-center gap-1">
              {showEdit && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:hover:bg-amber-950 dark:hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isEditDisabled}
                          onClick={() => actions.edit!(item)}
                        >
                          <LuPencil className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(actions.tooltips?.edit, item, t("general.actions.edit"))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showActivate && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-950 dark:hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isActivateDisabled}
                          onClick={() => actions.activate!(item)}
                        >
                          <LuUserCheck className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(
                        actions.tooltips?.activate,
                        item,
                        t("general.actions.activate"),
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showDeactivate && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isDeactivateDisabled}
                          onClick={() => actions.deactivate!(item)}
                        >
                          <LuUserX className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(
                        actions.tooltips?.deactivate,
                        item,
                        t("general.actions.deactivate"),
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showAssign && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isAssignDisabled}
                          onClick={() => actions.assign!(item)}
                        >
                          <LuUserPlus className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(actions.tooltips?.assign, item, t("general.actions.assign"))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showUnassign && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isUnassignDisabled}
                          onClick={() => actions.unassign!(item)}
                        >
                          <LuUserMinus className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(
                        actions.tooltips?.unassign,
                        item,
                        t("general.actions.unassign"),
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showDelete && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isDeleteDisabled}
                          onClick={() => actions.delete!(item)}
                        >
                          <LuTrash2 className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(actions.tooltips?.delete, item, t("general.actions.delete"))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {showResolved && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-green-600 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-950 dark:hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isResolvedDisabled}
                          onClick={() => actions.resolved!(item)}
                        >
                          <LuCheck className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {resolveTooltip(
                        actions.tooltips?.resolved,
                        item,
                        t("general.actions.resolved"),
                      )}
                    </TooltipContent>
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

        <div className="flex items-center gap-2">
          {filter && (
            <Select value={filter.value} onValueChange={filter.onChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {filter.allLabel ?? t("general.table.allOptions")}
                </SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

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
        </div>
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
                          {sortDirection === "asc" && <LuArrowUp className="h-3.5 w-3.5" />}
                          {sortDirection === "desc" && <LuArrowDown className="h-3.5 w-3.5" />}
                          {!sortDirection && <LuArrowUpDown className="h-3.5 w-3.5 opacity-40" />}
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
