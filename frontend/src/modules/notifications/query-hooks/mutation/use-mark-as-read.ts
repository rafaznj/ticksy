import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IMarkNotificationAsReadService } from "@/modules/notifications/services/contracts/mark-as-read";
import handleMutationResponse from "@/shared/response/handle-mutation-response";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import { toast } from "sonner";
import { t } from "i18next";

export function useMarkNotificationAsRead(service: IMarkNotificationAsReadService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await service.execute(notificationId);

      return handleMutationResponse(response);
    },
    onSuccess: () => {
      toast.success(t("notifications.messages.markAsRead"));
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
