import type { LoginDto } from "@/modules/auth/dto/login.dto";
import type { ILoginService } from "@/modules/auth/services/contracts/login";
import { AppError } from "@/shared/errors/app-error";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useLoginMutation(loginService: ILoginService) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await loginService.execute(data);

      if (response instanceof AppError) {
        throw response;
      }

      await navigate({ to: "/home" });

      return response;
    },
    onError: (error: AppError) => {
      toast.error(error.message);
    },
  });
}
