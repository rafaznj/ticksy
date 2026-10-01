import { useQuery } from "@tanstack/react-query";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import handleQueryResponse from "@/shared/response/handle-query-response";
import type { IGetTicketPagedLastSevenDaysService } from "@/modules/ticket/services/contracts/get-paged-last-seven-days";

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
    queryKey: ["tickets", "paged", params],
    queryFn: async (context) => {
      const response = await getTicketPagedLastSevenDaysService.execute(params);

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
