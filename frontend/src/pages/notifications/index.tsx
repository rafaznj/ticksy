import { NotificationsPagedTable } from "@/components/tables/notifications";

export function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4 mt-10">
      <NotificationsPagedTable />
    </div>
  );
}
