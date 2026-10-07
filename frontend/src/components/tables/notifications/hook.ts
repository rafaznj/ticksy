import { useMemo, createElement } from "react";
import { useTranslation } from "react-i18next";
import { usePagedQuery } from "@/components/PagedTable/hook";
import { container } from "@/lib/inversifyJS/index.container";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import type { IGetNotificationPagedService } from "@/modules/notifications/services/contracts/get-paged";
import type { IGetUnreadNotificationCountService } from "@/modules/notifications/services/contracts/get-unread-count";
import type { IMarkNotificationAsReadService } from "@/modules/notifications/services/contracts/mark-as-read";
import type { IMarkAllNotificationsAsReadService } from "@/modules/notifications/services/contracts/mark-all-as-read";
import { useGetUnreadNotificationCount } from "@/modules/notifications/query-hooks/query/use-get-unread-count";
import { useMarkNotificationAsRead } from "@/modules/notifications/query-hooks/mutation/use-mark-as-read";
import { useMarkAllNotificationsAsRead } from "@/modules/notifications/query-hooks/mutation/use-mark-all-as-read";
import { notificationTableColumns } from "./columns";
import type { INotification } from "@/modules/notifications/entity/notification.entity";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import { LuCheck, LuCheckCheck } from "react-icons/lu";

export function useNotificationsPagedTable() {
  const { t } = useTranslation();

  const getNotificationPagedService = container.get<IGetNotificationPagedService>(
    SERVICE_TOKENS.GetNotificationPagedService,
  );
  const getUnreadNotificationCountService = container.get<IGetUnreadNotificationCountService>(
    SERVICE_TOKENS.GetUnreadNotificationCountService,
  );
  const markNotificationAsReadService = container.get<IMarkNotificationAsReadService>(
    SERVICE_TOKENS.MarkNotificationAsReadService,
  );
  const markAllNotificationsAsReadService = container.get<IMarkAllNotificationsAsReadService>(
    SERVICE_TOKENS.MarkAllNotificationsAsReadService,
  );

  const paged = usePagedQuery(getNotificationPagedService, {
    queryKey: TANSTACK_QUERY_KEYS.GET_NOTIFICATION_PAGED,
  });
  const unreadCountQuery = useGetUnreadNotificationCount({
    getUnreadNotificationCountService,
  });
  const { mutate: markAsRead } = useMarkNotificationAsRead(markNotificationAsReadService);
  const { mutate: markAllAsRead, isPending: isMarkingAllAsRead } = useMarkAllNotificationsAsRead(
    markAllNotificationsAsReadService,
  );

  const columns = useMemo(() => notificationTableColumns(t), [t]);
  const actions = useMemo(
    () => ({
      markAsRead: (notification: INotification) => markAsRead(notification.id),
      visibilityAction: {
        markAsRead: (notification: INotification) => notification.read === false,
      },
      tooltips: {
        markAsRead: () => t("general.actions.markAsRead"),
      },
      disabledTooltips: {
        markAsRead: () => t("notifications.messages.markRead"),
      },
      actionIcons: {
        markAsRead: (notification: INotification) =>
          notification.read
            ? createElement(LuCheckCheck, { className: "h-4 w-4" })
            : createElement(LuCheck, { className: "h-4 w-4" }),
      },
    }),
    [markAsRead, t],
  );

  return {
    ...paged,
    columns,
    actions,
    unreadCount: unreadCountQuery.data?.count ?? 0,
    isUnreadCountLoading: unreadCountQuery.isLoading,
    isMarkingAllAsRead,
    markAllAsRead,
    t,
  };
}
