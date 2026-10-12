import { useQuery } from "@tanstack/react-query";
import type { IGetUserByIdService } from "../../services/contracts/get-by-id";
import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";

interface Params {
  getUserByIdService: IGetUserByIdService;
  id: string;
}

export function useGetUserById({ getUserByIdService, id }: Params) {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_USER_BY_ID, id],
    queryFn: async () => getUserByIdService.execute(id),
    enabled: !!id,
  });
}
