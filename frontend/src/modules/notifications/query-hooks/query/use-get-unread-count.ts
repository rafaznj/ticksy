import { useQuery } from "@tanstack/react-query";
import handleQueryResponse from "@/shared/response/handle-query-response";
import type { IGetUnreadNotificationCountService } from "@/modules/notifications/services/contracts/get-unread-count";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

interface Params {
  getUnreadNotificationCountService: IGetUnreadNotificationCountService;
  enabled?: boolean;
}

export function useGetUnreadNotificationCount({
  getUnreadNotificationCountService,
  enabled = true,
}: Params) {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
    queryFn: async (context) => {
      const response = await getUnreadNotificationCountService.execute();

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
