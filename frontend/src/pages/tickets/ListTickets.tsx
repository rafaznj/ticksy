import { TicketsPagedTable } from "@/components/tables/tickets";

export function ListTicketsPage() {
  return (
    <div className="mt-2 flex min-w-0 flex-col gap-4 sm:mt-8">
      <TicketsPagedTable />
    </div>
  );
}
