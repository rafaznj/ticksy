import { useAdminMetrics } from "@/components/AdminMetrics/hook";
import { MetricCard } from "@/components/MetricCard";
import { RecentActivity } from "@/components/RecentActivity";
import { RecentTicketsTable } from "@/components/RecentTicketsTable";

export function AdminMetrics() {
  const { metrics } = useAdminMetrics();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-3" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RecentActivity />
          <RecentTicketsTable />
        </div>
      </div>
    </div>
  );
}
