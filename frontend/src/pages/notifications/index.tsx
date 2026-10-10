import { NotificationsPagedTable } from "@/components/tables/notifications";

export function NotificationsPage() {
  return (
    <div className="mt-2 flex min-w-0 flex-col gap-4 sm:mt-10">
      <NotificationsPagedTable />
    </div>
  );
}
