import { useMutation } from "@tanstack/react-query";
import type { CreateUserDto } from "../../dto/create-user.dto";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";
import { AppError } from "@/shared/errors/app-error";
import { toast } from "sonner";

export function useCreateUser(createUserService: ICreateUserService) {
  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const response = await createUserService.execute(data);

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
