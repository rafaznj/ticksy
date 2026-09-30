import { useQuery } from "@tanstack/react-query";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import handleQueryResponse from "@/shared/response/handle-query-response";
import type { IGetTicketPagedCurrentMonthService } from "@/modules/ticket/services/contracts/get-paged-current-month";

interface Params {
  getTicketPagedCurrentMonthService: IGetTicketPagedCurrentMonthService;
  params: PagedParamsQuery;
  enabled?: boolean;
}

export function useGetTicketPagedCurrentMonth({
  getTicketPagedCurrentMonthService,
  params,
  enabled = true,
}: Params) {
  return useQuery({
    queryKey: ["tickets", "paged", params],
    queryFn: async (context) => {
      const response = await getTicketPagedCurrentMonthService.execute(params);

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
