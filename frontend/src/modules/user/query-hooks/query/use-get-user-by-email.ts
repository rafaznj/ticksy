import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import type { IGetUserByEmailService } from "@/modules/user/services/contracts/get-by-email";
import { useQuery } from "@tanstack/react-query";

interface Params {
  getUserByEmailService: IGetUserByEmailService;
  email: string;
}

export function useGetUserByEmail({ getUserByEmailService, email }: Params) {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_USER_BY_EMAIL, email],
    queryFn: async () => getUserByEmailService.execute(email),
    enabled: !!email,
  });
}
