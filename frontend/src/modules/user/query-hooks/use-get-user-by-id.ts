import { useQuery } from "@tanstack/react-query";
import type { IGetUserByIdService } from "../services/contracts/get-by-id";

export function useGetUserById(getUserByIdService: IGetUserByIdService, id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserByIdService.execute(id),
    enabled: Boolean(id),
  });
}
