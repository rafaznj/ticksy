import type { LoginData } from "@/modules/auth/data/login.data";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { AppError } from "@/shared/errors/app-error";
import handleMutationResponse from "@/shared/interfaces/handle-mutation-response";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useLoginMutation(loginService: ILoginService) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await loginService.execute(data);

      const result = handleMutationResponse(response);
      await navigate({ to: result.user.mustChangePassword ? "/confirm-password" : "/home" });
      return result;
    },
    onError: (error: AppError) => {
      toast.error(error.message);
    },
  });
}
