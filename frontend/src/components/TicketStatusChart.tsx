import { useId, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  createHorizontalChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";
import { enumToLabels } from "@/shared/utils/enum-to-labels";
import type { StatusCountDTO } from "@/modules/ticket/dtos/status-count";

type ChartDatum = { label: string; open: number; inProgress: number; resolved: number };

const Typed = createHorizontalChart<ChartDatum, string, number>()({
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
});

const SERIES = [
  { dataKey: "open", status: TicketStatusEnum.OPEN, color: "#3b82f6" },
  { dataKey: "inProgress", status: TicketStatusEnum.IN_PROGRESS, color: "#a855f7" },
  { dataKey: "resolved", status: TicketStatusEnum.RESOLVED, color: "#10b981" },
] as const;

const AXIS_TICK = { fill: "var(--muted-foreground)" };

const TOOLTIP_CONTENT_STYLE = {
  backgroundColor: "var(--popover)",
  borderColor: "var(--border)",
  borderRadius: 8,
};

const TOOLTIP_LABEL_STYLE = { color: "var(--popover-foreground)" };

function getWeekRangeLabel(week: number, locale: string) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const startDay = (week - 1) * 7 + 1;
  const endDay = Math.min(week * 7, daysInMonth);
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(now);
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${pad(startDay)}–${pad(endDay)} ${month}`;
}

type TicketStatusChartProps = {
  data?: StatusCountDTO[];
  isLoading?: boolean;
  isAnimationActive?: boolean;
  height?: number;
};

export function TicketStatusChart({
  data,
  isLoading = false,
  isAnimationActive = true,
  height = 240,
}: TicketStatusChartProps) {
  const { t, i18n } = useTranslation();
  const chartId = useId().replace(/:/g, "");

  const statusLabels = useMemo(() => enumToLabels(TicketStatusEnum, "ticket.status", t), [t]);

  const chartData = useMemo<ChartDatum[]>(
    () =>
      (data ?? []).map(({ week, open, inProgress, resolved }) => ({
        label: getWeekRangeLabel(week, i18n.language),
        open,
        inProgress,
        resolved,
      })),
    [data, i18n.language],
  );

  const chartStyle = { width: "100%", height };

  return (
    <div className="rounded-xl border bg-muted/50 p-4">
      {isLoading || !data ? (
        <div style={chartStyle} className="animate-pulse rounded-md bg-muted" />
      ) : (
        <Typed.AreaChart
          style={chartStyle}
          responsive
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            {SERIES.map(({ dataKey, color }) => (
              <linearGradient
                key={dataKey}
                id={`${chartId}-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={color} stopOpacity={0.2} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="var(--border)" />
          <Typed.XAxis dataKey="label" tick={AXIS_TICK} />
          <Typed.YAxis width="auto" allowDecimals={false} tick={AXIS_TICK} />
          <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} labelStyle={TOOLTIP_LABEL_STYLE} />
          <Legend position={"top"} iconType="square" wrapperStyle={{ paddingBottom: 14 }} />
          {SERIES.map(({ dataKey, status, color }) => (
            <Typed.Area
              key={dataKey}
              type="monotoneY"
              dataKey={dataKey}
              name={statusLabels[status]}
              stroke={color}
              activeDot={{ stroke: color }}
              fillOpacity={1}
              fill={`url(#${chartId}-${dataKey})`}
              isAnimationActive={isAnimationActive}
              animationBegin={200}
              animationDuration={1300}
            />
          ))}
          <RechartsDevtools />
        </Typed.AreaChart>
      )}
    </div>
  );
}
