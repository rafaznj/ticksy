import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import type { IGetTicketStatusCountService } from "@/modules/ticket/services/contracts/get-status-count";
import handleQueryResponse from "@/shared/response/handle-query-response";
import { useQuery } from "@tanstack/react-query";

export function useGetTicketStatusCount(getTicketStatusCountService: IGetTicketStatusCountService) {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_STATUS_COUNT],
    queryFn: async () => {
      const response = await getTicketStatusCountService.execute();

      return handleQueryResponse({ response });
    },
  });
}
