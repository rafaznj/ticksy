import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import { t } from "i18next";
import { userActiveStyles, userRoleStyles } from "@/shared/constants/enum-styles";
import type { UserPagedDto } from "@/modules/user/dto/user-paged.dto";

interface userTableColumnsParams {
  roleLabels: Record<string, string>;
}

export function userTableColumns({
  roleLabels,
}: userTableColumnsParams): ColumnDef<UserPagedDto>[] {
  const columns: ColumnDef<UserPagedDto>[] = [
    {
      accessorKey: "name",
      header: t("user.table.columns.name"),
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "email",
      header: t("user.table.columns.email"),
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "role",
      header: t("user.table.columns.role"),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`capitalize ${userRoleStyles[row.original.role] ?? ""}`}
        >
          {roleLabels[row.original.role] ?? row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "isActive",
      header: t("user.table.columns.isActive"),
      cell: ({ row }) => {
        return (
          <Badge
            className={row.original.deleted ? userActiveStyles.inactive : userActiveStyles.active}
          >
            {row.original.deleted ? t("user.status.disabled") : t("user.status.enabled")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: t("user.table.columns.created_at"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: t("user.table.columns.updated_at"),
      cell: ({ row }) => formatDate(row.original.updatedAt),
    },
  ];

  return columns;
}
