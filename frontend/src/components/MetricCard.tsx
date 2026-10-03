import { cn } from "@/lib/utils";

import type { IconType } from "react-icons/lib";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

export interface MetricCardItem {
  title: string;
  value: string | number;
  description?: string;
  icon: IconType;
  trend?: "up" | "down";
  trendValue?: string;
  iconColor?: string;
  onClick?: () => void;
}

interface MetricCardProps {
  metrics: MetricCardItem[];
  className?: string;
}

export function MetricCard({ metrics, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-blue-200 bg-blue-200 dark:border-blue-900/40 dark:bg-blue-900/40",
        className,
      )}
    >
      {metrics.map((metric) => (
        <MetricCardItem key={metric.title} {...metric} />
      ))}
    </div>
  );
}

function MetricCardItem({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  iconColor = "text-blue-600",
  onClick,
}: MetricCardItem) {
  const cellClassName = cn(
    "flex w-full flex-col gap-1.5 bg-card px-5 py-4 text-left",
    onClick &&
      "cursor-pointer transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset",
  );

  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-sm text-muted-foreground">{title}</span>
        <Icon className={cn("size-5 shrink-0", iconColor)} aria-hidden />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{value}</span>

        {trend && trendValue && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              trend === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400",
            )}
          >
            {trend === "up" ? (
              <LuTrendingUp className="size-3.5" />
            ) : (
              <LuTrendingDown className="size-3.5" />
            )}
            {trendValue}
          </span>
        )}

        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </>
  );

  return onClick ? (
    <button type="button" onClick={onClick} className={cellClassName}>
      {content}
    </button>
  ) : (
    <div className={cellClassName}>{content}</div>
  );
}
