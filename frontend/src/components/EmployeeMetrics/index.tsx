import { Ticket, AlertCircle, CheckCircle } from "lucide-react";

import { MetricCard, type MetricCardItem } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { RecentActivity } from "@/components/RecentActivity";
import { RecentTicketsTable } from "@/components/RecentTicketsTable";

const metrics: MetricCardItem[] = [
  {
    title: "Meus Tickets",
    value: "18",
    description: "no total",
    icon: Ticket,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Abertos",
    value: "5",
    description: "aguardando ação",
    icon: AlertCircle,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    title: "Resolvidos",
    value: "13",
    description: "no total",
    icon: CheckCircle,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
];

export function EmployeeMetrics() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-3" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PerformanceChart />
          <RecentActivity />
        </div>

        <RecentTicketsTable />
      </div>
    </div>
  );
}
