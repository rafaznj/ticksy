import type { ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Trans } from "react-i18next";
import { cn } from "@/lib/utils";
import { formatDate } from "@/shared/utils/format-date";
import type { INotification } from "@/modules/notifications/entity/notification.entity";
import { TicketStatusEnum } from "@/modules/ticket/enums/status.enum";

const statusKeys = {
  [TicketStatusEnum.OPEN]: "notifications.ticketStatus.open",
  [TicketStatusEnum.IN_PROGRESS]: "notifications.ticketStatus.inProgress",
  [TicketStatusEnum.RESOLVED]: "notifications.ticketStatus.resolved",
} as const satisfies Record<TicketStatusEnum, string>;

const statusColors = {
  [TicketStatusEnum.OPEN]: "text-blue-800 dark:text-blue-300",
  [TicketStatusEnum.IN_PROGRESS]: "text-purple-800 dark:text-purple-300",
  [TicketStatusEnum.RESOLVED]: "text-emerald-800 dark:text-emerald-300",
} as const satisfies Record<TicketStatusEnum, string>;

function isTicketStatus(value: string | undefined): value is TicketStatusEnum {
  return Object.values(TicketStatusEnum).includes(value as TicketStatusEnum);
}

const messageComponents = {
  highlight: <span className="font-semibold text-blue-600" />,
  ticket: (
    <span className="font-medium text-blue-600 underline decoration-blue-600/50 decoration-1 underline-offset-4" />
  ),
};

export function notificationTableColumns(t: TFunction): ColumnDef<INotification>[] {
  const messageKeys = {
    ticket_assigned: "notifications.messages.types.ticket_assigned",
    ticket_created: "notifications.messages.types.ticket_created",
    ticket_status_changed: "notifications.messages.types.ticket_status_changed",
    ticket_unassigned: "notifications.messages.types.ticket_unassigned",
  } as const;

  return [
    {
      id: "title",
      header: t("notifications.table.columns.title"),
      cell: ({ row }) => {
        const userName = row.original.parameters?.userName;
        const title = row.original.parameters?.title;
        const rawStatus = row.original.parameters?.status;
        const validStatus = isTicketStatus(rawStatus) ? rawStatus : undefined;
        const status = validStatus ? t(statusKeys[validStatus]) : rawStatus;

        return (
          <Trans
            t={t}
            i18nKey={messageKeys[row.original.type]}
            values={{ userName, title, status }}
            components={{
              ...messageComponents,
              status: (
                <span
                  className={cn(
                    "font-semibold",
                    validStatus ? statusColors[validStatus] : "text-foreground",
                  )}
                />
              ),
            }}
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      header: t("notifications.table.columns.date"),
      cell: ({ row }) => formatDate(row.original.createdAt),
      enableSorting: true,
    },
  ];
}
