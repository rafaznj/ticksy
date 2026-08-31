import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  iconBg?: string;
  onClick?: () => void;
}

interface MetricCardProps {
  metrics: MetricCardItem[];
  className?: string;
}

export function MetricCard({ metrics, className }: MetricCardProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}>
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
  iconBg = "bg-blue-50 dark:bg-blue-950/50",
  onClick,
}: MetricCardItem) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group flex min-h-40 flex-col justify-center ring-blue-200 animate-slide-up transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:ring-blue-900/40",
        onClick && "cursor-pointer",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={cn(
            "flex items-center justify-center rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
            iconBg,
          )}
        >
          <Icon className={cn("size-6", iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-4xl font-bold tracking-tight">{value}</p>
        <div className="flex items-center gap-2">
          {trend && trendValue && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium",
                trend === "up"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
              )}
            >
              {trend === "up" ? (
                <LuTrendingUp className="size-4" />
              ) : (
                <LuTrendingDown className="size-4" />
              )}
              {trendValue}
            </span>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
