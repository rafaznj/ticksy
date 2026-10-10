import type { IGetUserByEmailService } from "@/modules/user/services/contracts/get-by-email";
import { useQuery } from "@tanstack/react-query";

export function useGetUserByEmail(getUserByEmailService: IGetUserByEmailService, email: string) {
  return useQuery({
    queryKey: ["users", "email", email],
    queryFn: () => getUserByEmailService.execute(email),
    enabled: !!email,
  });
}
