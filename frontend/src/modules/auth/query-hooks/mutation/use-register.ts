import { useMutation } from "@tanstack/react-query";
import { AppError } from "@/shared/errors/app-error";
import { toast } from "sonner";
import type { IRegisterService } from "@/modules/auth/services/contracts/register";
import type { CreateUserDto } from "@/modules/user/dto/create-user.dto";

export function useRegister(registerService: IRegisterService) {
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await registerService.execute(data);

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
