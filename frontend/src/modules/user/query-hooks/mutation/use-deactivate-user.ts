import type { IDeactivateUserService } from "@/modules/user/services/contracts/deactivate";
import { AppError } from "@/shared/errors/app-error";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeactivateUser(deactivateUserService: IDeactivateUserService) {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deactivateUserService.execute(id);

      if (response instanceof AppError) {
        throw response;
      }

      return response;
    },
    onError: (error: AppError) => {
      toast.error(error.message);
    },
  });
}
