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
import { TruncatedCell } from "@/components/tables/shared/TrucatedCell";
import { useTranslation } from "react-i18next";
import {
  LuArrowDown,
  LuArrowUp,
  LuArrowUpDown,
  LuCheck,
  LuPencil,
  LuSearch,
  LuTrash2,
  LuUserCheck,
  LuUserMinus,
  LuUserPlus,
  LuUserX,
  LuX,
} from "react-icons/lu";
import { GrNext, GrPrevious } from "react-icons/gr";
import { formatDate } from "@/shared/utils/format-date";

type TooltipValue<T> = string | ((item: T) => string);
type ActionIcon<T> = React.ReactNode | ((item: T) => React.ReactNode);

interface ActionVisibility<T> {
  edit?: (row: T) => boolean;
  activate?: (item: T) => boolean;
  deactivate?: (item: T) => boolean;
  delete?: (row: T) => boolean;
  assign?: (item: T) => boolean;
  unassign?: (item: T) => boolean;
  resolved?: (item: T) => boolean;
  markAsRead?: (item: T) => boolean;
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
    markAsRead?: TooltipValue<T>;
  };
  disabledTooltips?: {
    edit?: TooltipValue<T>;
    activate?: TooltipValue<T>;
    deactivate?: TooltipValue<T>;
    delete?: TooltipValue<T>;
    assign?: TooltipValue<T>;
    unassign?: TooltipValue<T>;
    resolved?: TooltipValue<T>;
    markAsRead?: TooltipValue<T>;
  };
  actionIcons?: {
    edit?: ActionIcon<T>;
    activate?: ActionIcon<T>;
    deactivate?: ActionIcon<T>;
    delete?: ActionIcon<T>;
    assign?: ActionIcon<T>;
    unassign?: ActionIcon<T>;
    resolved?: ActionIcon<T>;
    markAsRead?: ActionIcon<T>;
  };
  toggleActions?: ReadonlyArray<"activate" | "deactivate" | "assign" | "unassign">;
  edit?: (item: T) => void;
  activate?: (item: T) => void;
  deactivate?: (item: T) => void;
  delete?: (item: T) => void;
  assign?: (item: T) => void;
  unassign?: (item: T) => void;
  resolved?: (item: T) => void;
  markAsRead?: (item: T) => void;
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
  emptyMessage?: React.ReactNode;
  actions?: ActionsConfig<T>;
  sorting?: SortingState;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  headerButtons?: HeaderButtonConfig[];
  headerDynamicComponent?: React.ReactNode;
  showSearch?: boolean;
  filters?: FilterConfig[];
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

function resolveActionIcon<T>(icon: ActionIcon<T> | undefined, item: T, fallback: React.ReactNode) {
  return typeof icon === "function" ? icon(item) : (icon ?? fallback);
}

function getColumnWidthClass(columnId: string): string {
  const widths: Record<string, string> = {
    actions: "w-32 min-w-32 sm:w-44 sm:min-w-44",
    code: "w-20 min-w-20",
    title: "w-56 min-w-56",
    description: "w-64 min-w-64",
    name: "w-44 min-w-44",
    email: "w-56 min-w-56",
    role: "w-40 min-w-40",
    status: "w-32 min-w-32",
    priority: "w-32 min-w-32",
    category: "w-36 min-w-36",
    createdByName: "w-44 min-w-44",
    assignedToName: "w-44 min-w-44",
    createdAt: "w-36 min-w-36",
    updatedAt: "w-36 min-w-36",
    isActive: "w-32 min-w-32",
  };

  return widths[columnId] ?? "w-40 min-w-40";
}

export function PagedTable<T>({
  columns,
  data,
  search,
  hasPrevious,
  hasNext,
  isLoading,
  isError,
  emptyMessage,
  actions,
  sorting,
  pageSize,
  rowsPerPageOptions = [10, 25, 50, 100],
  headerButtons,
  headerDynamicComponent,
  showSearch = true,
  filters,
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
          const isMarkAsReadVisible = actions.visibilityAction?.markAsRead?.(item) !== false;

          const showEdit = !!actions.edit;
          const showActivate =
            !!actions.activate &&
            (!actions.toggleActions?.includes("activate") || isActivateVisible);
          const showDeactivate =
            !!actions.deactivate &&
            (!actions.toggleActions?.includes("deactivate") || isDeactivateVisible);
          const showDelete = !!actions.delete;
          const showAssign =
            !!actions.assign && (!actions.toggleActions?.includes("assign") || isAssignVisible);
          const showUnassign =
            !!actions.unassign &&
            (!actions.toggleActions?.includes("unassign") || isUnassignVisible);
          const showResolved = !!actions.resolved;
          const showMarkAsRead = !!actions.markAsRead;

          if (
            !showEdit &&
            !showActivate &&
            !showDeactivate &&
            !showDelete &&
            !showAssign &&
            !showUnassign &&
            !showResolved &&
            !showMarkAsRead
          ) {
            return null;
          }

          const isEditDisabled = !isEditVisible || !!actions.disableAction?.edit?.(item);
          const isActivateDisabled =
            !isActivateVisible || !!actions.disableAction?.activate?.(item);
          const isDeactivateDisabled =
            !isDeactivateVisible || !!actions.disableAction?.deactivate?.(item);
          const isDeleteDisabled = !isDeleteVisible || !!actions.disableAction?.delete?.(item);
          const isAssignDisabled = !isAssignVisible || !!actions.disableAction?.assign?.(item);
          const isUnassignDisabled =
            !isUnassignVisible || !!actions.disableAction?.unassign?.(item);
          const isResolvedDisabled =
            !isResolvedVisible || !!actions.disableAction?.resolved?.(item);
          const isMarkAsReadDisabled =
            !isMarkAsReadVisible || !!actions.disableAction?.markAsRead?.(item);

          return (
            <div className="flex items-center justify-center gap-1">
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
                          {resolveActionIcon(
                            actions.actionIcons?.edit,
                            item,
                            <LuPencil className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isEditDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.edit,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(actions.tooltips?.edit, item, t("general.actions.edit"))}
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
                          {resolveActionIcon(
                            actions.actionIcons?.activate,
                            item,
                            <LuUserCheck className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isActivateDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.activate,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
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
                          {resolveActionIcon(
                            actions.actionIcons?.deactivate,
                            item,
                            <LuUserX className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isDeactivateDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.deactivate,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
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
                          {resolveActionIcon(
                            actions.actionIcons?.assign,
                            item,
                            <LuUserPlus className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isAssignDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.assign,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
                            actions.tooltips?.assign,
                            item,
                            t("general.actions.assign"),
                          )}
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
                          {resolveActionIcon(
                            actions.actionIcons?.unassign,
                            item,
                            <LuUserMinus className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isUnassignDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.unassign,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
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
                          {resolveActionIcon(
                            actions.actionIcons?.delete,
                            item,
                            <LuTrash2 className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isDeleteDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.delete,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
                            actions.tooltips?.delete,
                            item,
                            t("general.actions.delete"),
                          )}
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
                          {resolveActionIcon(
                            actions.actionIcons?.resolved,
                            item,
                            <LuCheck className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isResolvedDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.resolved,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
                            actions.tooltips?.resolved,
                            item,
                            t("general.actions.resolve"),
                          )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {showMarkAsRead && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer rounded-md bg-muted text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isMarkAsReadDisabled}
                          onClick={() => actions.markAsRead!(item)}
                        >
                          {resolveActionIcon(
                            actions.actionIcons?.markAsRead,
                            item,
                            <LuCheck className="h-4 w-4" />,
                          )}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isMarkAsReadDisabled
                        ? resolveTooltip(
                            actions.disabledTooltips?.markAsRead,
                            item,
                            t("general.actions.unavailable"),
                          )
                        : resolveTooltip(
                            actions.tooltips?.markAsRead,
                            item,
                            t("general.actions.markAsRead"),
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
    <div className="flex max-h-[calc(100vh-8rem)] min-h-0 w-full min-w-0 flex-col gap-3 sm:gap-4">
      <div className="flex shrink-0 flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {showSearch && (
            <div className="relative min-w-0 flex-1 sm:w-full sm:max-w-sm">
              <Input
                placeholder={t("general.table.searchPlaceholder")}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8"
              />

              <LuSearch className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          )}

          {headerButtons && headerButtons.length > 0 && (
            <div className="flex min-w-0 flex-wrap items-center justify-start gap-2 sm:justify-end">
              {headerButtons.map((btn, i) => (
                <Button key={i} variant={btn.variant ?? "default"} onClick={btn.onClick}>
                  {btn.label}
                  {btn.icon}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex w-full min-w-0 flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
          {filters && filters.length > 0 && (
            <>
              {filters.map((f, i) => (
                <div key={i} className="relative min-w-0 flex-1 sm:flex-none">
                  <Select value={f.value} onValueChange={f.onChange}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder={f.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {f.allLabel ?? t("general.table.allOptions")}
                      </SelectItem>
                      {f.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {f.value !== "all" && (
                    <button
                      type="button"
                      onClick={() => f.onChange("all")}
                      className="absolute top-1/2 right-7 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                    >
                      <LuX className="size-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </>
          )}
          {headerDynamicComponent}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto rounded-md border">
        <Table className="min-w-4xl table-fixed md:min-w-full">
          <TableHeader className="sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <TableHead
                      key={header.id}
                      className={`${getColumnWidthClass(header.column.id)} whitespace-normal px-2 text-left sm:px-4 ${
                        header.column.id === "actions" ? "text-center" : ""
                      }`}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="flex min-w-0 items-center justify-start gap-1 whitespace-normal text-left hover:text-foreground"
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
                  {emptyMessage ?? t("general.table.emptyMessage")}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue();
                    const text = value instanceof Date ? formatDate(value) : String(value ?? "");

                    return (
                      <TableCell
                        key={cell.id}
                        className={`${getColumnWidthClass(cell.column.id)} whitespace-normal px-2 sm:px-4 ${
                          cell.column.id === "actions"
                            ? "overflow-visible text-center"
                            : "max-w-0 overflow-hidden"
                        }`}
                      >
                        {cell.column.id === "actions" ? (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        ) : (
                          <TruncatedCell text={text}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TruncatedCell>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-end gap-3">
        <div className="flex items-center gap-2">
          {onPageSizeChange && (
            <>
              <Select
                value={String(pageSize ?? rowsPerPageOptions[0])}
                onValueChange={(value) => onPageSizeChange(Number(value))}
                aria-label={t("general.table.rowsPerPage")}
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

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={t("general.table.previous")}
              disabled={!hasPrevious}
              onClick={onPreviousPage}
            >
              <GrPrevious />
            </Button>

            <Button
              variant="outline"
              size="icon-sm"
              aria-label={t("general.table.next")}
              disabled={!hasNext}
              onClick={onNextPage}
            >
              <GrNext />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
