import { UsersPagedTable } from "@/components/tables/users";

export function ListUsersPage() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <UsersPagedTable />
    </div>
  );
}
