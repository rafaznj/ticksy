import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IMarkAllNotificationsAsReadService } from "@/modules/notifications/services/contracts/mark-all-as-read";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import { toast } from "sonner";
import { t } from "i18next";

export function useMarkAllNotificationsAsRead(service: IMarkAllNotificationsAsReadService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await service.execute();

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("notifications.messages.markAllAsRead"));
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_PAGED],
      });
      void queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    },
  });
}
