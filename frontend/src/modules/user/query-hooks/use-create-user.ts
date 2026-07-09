import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserDto } from "../dto/create-user.dto";
import type { ICreateUserService } from "@/modules/user/services/contracts/create";

export function useCreateUser(createUserService: ICreateUserService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => createUserService.execute(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
