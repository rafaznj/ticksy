import { Ticket, AlertCircle, CheckCircle, Clock } from "lucide-react";

import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { RecentActivity } from "@/components/RecentActivity";
import { RecentTicketsTable } from "@/components/RecentTicketsTable";

const metrics = [
  {
    title: "Total de Tickets",
    value: "1.248",
    description: "vs. mês anterior",
    icon: Ticket,
    trend: "up" as const,
    trendValue: "+12.5%",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Tickets Abertos",
    value: "64",
    description: "aguardando ação",
    icon: AlertCircle,
    trend: "down" as const,
    trendValue: "-8.2%",
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    title: "Resolvidos este mês",
    value: "328",
    description: "vs. mês anterior",
    icon: CheckCircle,
    trend: "up" as const,
    trendValue: "+23.1%",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    title: "Tempo Médio",
    value: "4.2h",
    description: "para resolução",
    icon: Clock,
    trend: "down" as const,
    trendValue: "-15.3%",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 dark:bg-purple-950/50",
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} className="animate-slide-up" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PerformanceChart />
          <RecentActivity />
        </div>

        <RecentTicketsTable />
      </div>
    </div>
  );
}
