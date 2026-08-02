import { AlertCircle, CheckCircle, LoaderCircle } from "lucide-react";

import { MetricCard, type MetricCardItem } from "@/components/MetricCard";
import { RecentActivity } from "@/components/RecentActivity";

const metrics: MetricCardItem[] = [
  {
    title: "Abertos",
    value: "18",
    description: "Aguardando atendimento",
    icon: AlertCircle,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    title: "Em progresso",
    value: "5",
    description: "Em atendimento",
    icon: LoaderCircle,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    title: "Resolvidos",
    value: "13",
    description: "Atendidos com sucesso",
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
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
