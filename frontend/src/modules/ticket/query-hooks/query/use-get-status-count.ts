import type { IGetTicketStatusCountService } from "@/modules/ticket/services/contracts/get-status-count";
import handleQueryResponse from "@/shared/response/handle-query-response";
import { useQuery } from "@tanstack/react-query";

export function useGetTicketStatusCount(getTicketStatusCountService: IGetTicketStatusCountService) {
  return useQuery({
    queryKey: ["tickets", "status-count"],
    queryFn: async () => {
      const response = await getTicketStatusCountService.execute();

      return handleQueryResponse({ response });
    },
  });
}
