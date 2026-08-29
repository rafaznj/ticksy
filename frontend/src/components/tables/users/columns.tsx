import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import { t } from "i18next";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { UserEntity } from "@/modules/user/entity/user.entity";

const roleStyles: Record<UserRoleEnum, string> = {
  [UserRoleEnum.ADMIN]:
    "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/20",
  [UserRoleEnum.EMPLOYEE]:
    "bg-lime-50 text-lime-700 ring-1 ring-inset ring-lime-600/20 dark:bg-lime-400/10 dark:text-lime-400 dark:ring-lime-400/20",
  [UserRoleEnum.TECHNICAL_ASSISTANCE]:
    "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/20",
};

const activeStyles = {
  active:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  inactive:
    "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/20",
};

interface userTableColumnsParams {
  roleLabels: Record<string, string>;
}

export function userTableColumns({ roleLabels }: userTableColumnsParams): ColumnDef<UserEntity>[] {
  const columns: ColumnDef<UserEntity>[] = [
    { accessorKey: "name", header: t("user.table.columns.name") },
    { accessorKey: "email", header: t("user.table.columns.email") },
    {
      accessorKey: "role",
      header: t("user.table.columns.role"),
      cell: ({ row }) => (
        <Badge variant="secondary" className={`capitalize ${roleStyles[row.original.role] ?? ""}`}>
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
            variant="secondary"
            className={row.original.deleted ? activeStyles.inactive : activeStyles.active}
          >
            {row.original.deleted ? t("user.status.disabled") : t("user.status.enabled")}
          </Badge>
        );
      },
    },
  ];

  return columns;
}
