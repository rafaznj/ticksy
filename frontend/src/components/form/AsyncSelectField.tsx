import { useRef } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FieldErrors } from "@/components/form/FieldErrors";
import { useAsyncSelectField } from "@/hooks/use-async-select-field";
import type { IBaseGetPagedService } from "@/shared/base/services/contracts/get-paged";

interface AsyncSelectFieldProps<T> {
  service: IBaseGetPagedService<T>;
  bindValue: keyof T;
  bindLabel: keyof T;
  label?: string;
  required?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  pageSize?: number;
}

export function AsyncSelectField<T>({
  service,
  bindValue,
  bindLabel,
  label,
  required,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  pageSize,
}: AsyncSelectFieldProps<T>) {
  const { t } = useTranslation();

  const {
    field,
    open,
    onOpenChange,
    search,
    setSearch,
    options,
    isLoading,
    hasMore,
    loadMore,
    selectedLabel,
    handleSelect,
  } = useAsyncSelectField<T>({
    service,
    bindValue,
    bindLabel,
    pageSize,
  });

  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = listRef.current;

    if (!el || isLoading || !hasMore) return;

    const reachedBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 32;

    if (reachedBottom) {
      loadMore();
    }
  };

  const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;

  const resolvedPlaceholder = placeholder ?? t("general.table.placeholder");
  const resolvedSearchPlaceholder = searchPlaceholder ?? t("general.table.searchPlaceholder");
  const resolvedEmptyMessage = emptyMessage ?? t("general.table.emptyMessage");

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      <div className="flex w-full min-w-0 items-center justify-start gap-3">
        {label && (
          <Label htmlFor={field.name} className="flex shrink-0 items-center gap-0.5">
            {label}

            {required && (
              <span className="select-none font-semibold text-blue-700" aria-hidden="true">
                *
              </span>
            )}
          </Label>
        )}

        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild className="min-w-0 flex-1">
            <Button
              id={field.name}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={hasError}
              className="w-full min-w-0 justify-between font-normal"
            >
              <span className={cn("truncate", !selectedLabel && "text-muted-foreground")}>
                {selectedLabel ?? resolvedPlaceholder}
              </span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-(--radix-popover-trigger-width) max-w-[90vw] p-0"
            align="start"
          >
            <Command shouldFilter={false}>
              <CommandInput
                placeholder={resolvedSearchPlaceholder}
                value={search}
                onValueChange={setSearch}
              />

              <CommandList ref={listRef} onScroll={handleScroll}>
                {!isLoading && options.length === 0 && (
                  <CommandEmpty>{resolvedEmptyMessage}</CommandEmpty>
                )}

                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.state.value === option.value ? "opacity-100" : "opacity-0",
                        )}
                      />

                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>

                {isLoading && (
                  <div className="flex items-center justify-center py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <FieldErrors />
    </div>
  );
}
