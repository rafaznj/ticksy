import { useEmployeeMetrics } from "@/components/EmployeeMetrics/hook";
import { MetricCard } from "@/components/MetricCard";

export function EmployeeMetrics() {
  const { metrics } = useEmployeeMetrics();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <MetricCard metrics={metrics} className="lg:grid-cols-3" />
      </div>
    </div>
  );
}
