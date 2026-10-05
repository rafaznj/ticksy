import { useQuery } from "@tanstack/react-query";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import handleQueryResponse from "@/shared/response/handle-query-response";
import type { IGetTicketPagedLastSevenDaysService } from "@/modules/ticket/services/contracts/get-paged-last-seven-days";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

interface Params {
  getTicketPagedLastSevenDaysService: IGetTicketPagedLastSevenDaysService;
  params: PagedParamsQuery;
  enabled?: boolean;
}

export function useGetTicketPagedLastSevenDays({
  getTicketPagedLastSevenDaysService,
  params,
  enabled = true,
}: Params) {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TICKET_PAGED_LAST_SEVEN_DAYS],
    queryFn: async (context) => {
      const response = await getTicketPagedLastSevenDaysService.execute(params);

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
