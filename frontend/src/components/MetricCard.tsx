import type { LucideIcon } from "lucide-react";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  iconColor?: string;
  iconBg?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50 dark:bg-blue-950/50",
  className,
  style,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "group transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        className,
      )}
      style={style}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={cn(
            "flex items-center justify-center rounded-lg p-2 transition-transform duration-300 group-hover:scale-110",
            iconBg,
          )}
        >
          <Icon className={cn("size-4", iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <div className="flex items-center gap-1.5">
          {trend && trendValue && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium",
                trend === "up"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {trendValue}
            </span>
          )}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
