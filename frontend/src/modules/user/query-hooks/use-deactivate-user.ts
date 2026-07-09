import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeactivateUser(deactivateUserService: IDeactivateUserService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deactivateUserService.execute(id),
    onSuccess: (_result, id) => {
      void queryClient.invalidateQueries({ queryKey: ["users", id] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
