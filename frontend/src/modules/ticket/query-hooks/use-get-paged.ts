import { useQuery } from "@tanstack/react-query";
import type { IGetTicketPagedService } from "@/modules/ticket/services/contracts/get-paged";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import handleQueryResponse from "@/shared/response/handle-query-response";

interface Params {
  getTicketPagedService: IGetTicketPagedService;
  params: PagedParamsQuery;
  enabled?: boolean;
}

export function useGetTicketPaged({ getTicketPagedService, params, enabled = true }: Params) {
  return useQuery({
    queryKey: ["tickets", "paged", params],
    queryFn: async (context) => {
      const response = await getTicketPagedService.execute(params);

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
