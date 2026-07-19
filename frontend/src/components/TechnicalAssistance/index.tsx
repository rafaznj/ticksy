import { Ticket, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

import { MetricCard, type MetricCardItem } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { RecentActivity } from "@/components/RecentActivity";
import { RecentTicketsTable } from "@/components/RecentTicketsTable";

const metrics: MetricCardItem[] = [
  {
    title: "Meus Tickets",
    value: "27",
    description: "atribuídos a mim",
    icon: Ticket,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Em Andamento",
    value: "9",
    description: "sendo trabalhados",
    icon: Loader2,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    title: "Resolvidos Hoje",
    value: "6",
    description: "concluídos hoje",
    icon: CheckCircle,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
  },
  {
    title: "Alta Prioridade",
    value: "4",
    description: "requerem atenção",
    icon: AlertTriangle,
    iconColor: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-50 dark:bg-red-950/50",
  },
];

export function TechnicalAssistanceMetrics() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-4" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PerformanceChart />
          <RecentActivity />
        </div>

        <RecentTicketsTable />
      </div>
    </div>
  );
}
