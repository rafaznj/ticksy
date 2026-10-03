import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import { t } from "i18next";
import type { UserEntity } from "@/modules/user/entity/user.entity";
import { TruncatedCell } from "@/components/TruncatedCell";
import { userActiveStyles, userRoleStyles } from "@/shared/constants/enum-styles";

interface userTableColumnsParams {
  roleLabels: Record<string, string>;
}

export function userTableColumns({ roleLabels }: userTableColumnsParams): ColumnDef<UserEntity>[] {
  const columns: ColumnDef<UserEntity>[] = [
    {
      accessorKey: "name",
      header: t("user.table.columns.name"),
      cell: ({ row }) => <TruncatedCell text={row.original.name} maxLength={20} />,
    },
    {
      accessorKey: "email",
      header: t("user.table.columns.email"),
      cell: ({ row }) => <TruncatedCell text={row.original.email} maxLength={25} />,
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
      accessorKey: "createdAt",
      header: t("user.table.columns.created_at"),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "updatedAt",
      header: t("user.table.columns.updated_at"),
      cell: ({ row }) => formatDate(row.original.updatedAt),
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
  ];

  return columns;
}
