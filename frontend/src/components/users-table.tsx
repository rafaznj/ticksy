import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IGetUserPagedService } from "@/modules/user/services/contracts/get-paged";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { usePagedQuery } from "@/components/hook";
import { PagedTable } from "@/components/table";

const columns: ColumnDef<UserEntity>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Função" },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
];

export function UsersTable() {
  const getUserPagedService = container.get<IGetUserPagedService>(
    SERVICE_TOKENS.GetUserPagedService,
  );

  const {
    data,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    isLoading,
    isError,
    search,
    setSearch,
    nextPage,
    previousPage,
  } = usePagedQuery(getUserPagedService, { queryKey: "users" });

  return (
    <PagedTable
      columns={columns}
      data={data}
      search={search}
      onSearchChange={setSearch}
      currentPage={currentPage}
      totalPages={totalPages}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
      onNextPage={nextPage}
      onPreviousPage={previousPage}
      isLoading={isLoading}
      isError={isError}
      getRowId={(user) => user.id}
      searchPlaceholder="Buscar usuário..."
      emptyMessage="Nenhum usuário encontrado."
    />
  );
}
