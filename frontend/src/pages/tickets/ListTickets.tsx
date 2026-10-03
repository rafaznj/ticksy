import { TicketsPagedTable } from "@/components/tables/tickets";

export function ListTicketsPage() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <TicketsPagedTable />
    </div>
  );
}
