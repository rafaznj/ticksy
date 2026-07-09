import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUpdateUserService } from "../services/contracts/update";
import type { UpdateUserDto } from "../dto/update-user.dto";

export function useUpdateUser(updateUserService: IUpdateUserService) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      updateUserService.execute(id, data),
    onSuccess: (_result, { id }) => {
      void queryClient.invalidateQueries({ queryKey: ["users", id] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
