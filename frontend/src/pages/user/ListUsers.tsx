import { UsersPagedTable } from "@/components/tables/users";

export function ListUsersPage() {
  return (
    <div className="mt-2 flex min-w-0 flex-col gap-4 sm:mt-8">
      <UsersPagedTable />
    </div>
  );
}
