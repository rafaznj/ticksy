import { useQuery } from "@tanstack/react-query";
import type { IGetTicketPagedWithScopeService } from "@/modules/ticket/services/contracts/get-paged-with-scope";
import type { PagedParamsQuery } from "@/shared/types/paged-params-query";
import handleQueryResponse from "@/shared/response/handle-query-response";

interface Params {
  getTicketPagedWithScopeService: IGetTicketPagedWithScopeService;
  params: PagedParamsQuery;
  enabled?: boolean;
}

export function useGetTicketPagedWithScope({
  getTicketPagedWithScopeService,
  params,
  enabled = true,
}: Params) {
  return useQuery({
    queryKey: ["tickets", "paged", params],
    queryFn: async (context) => {
      const response = await getTicketPagedWithScopeService.execute(params);

      return handleQueryResponse({ response, context });
    },
    enabled,
  });
}
