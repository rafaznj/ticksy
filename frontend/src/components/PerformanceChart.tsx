import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { week: "Sem 1", abertos: 18, resolvidos: 12 },
  { week: "Sem 2", abertos: 25, resolvidos: 20 },
  { week: "Sem 3", abertos: 15, resolvidos: 22 },
  { week: "Sem 4", abertos: 30, resolvidos: 28 },
  { week: "Sem 5", abertos: 22, resolvidos: 18 },
  { week: "Sem 6", abertos: 20, resolvidos: 24 },
  { week: "Sem 7", abertos: 16, resolvidos: 26 },
  { week: "Sem 8", abertos: 28, resolvidos: 30 },
];

const chartConfig = {
  abertos: {
    label: "Abertos",
    color: "var(--chart-1)",
  },
  resolvidos: {
    label: "Resolvidos",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PerformanceChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Desempenho de Tickets</CardTitle>
        <CardDescription>Tickets abertos vs. resolvidos nas últimas 8 semanas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="fillAbertos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillResolvidos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="resolvidos"
                type="monotone"
                fill="url(#fillResolvidos)"
                stroke="var(--chart-3)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Area
                dataKey="abertos"
                type="monotone"
                fill="url(#fillAbertos)"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
