import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import type { IConfirmPasswordService } from "@/modules/user/services/contracts/confirm-password";
import { AppError } from "@/shared/errors/app-error";
import { useAuthStore } from "@/lib/zustand/use-auth";

export function useConfirmPassword(service: IConfirmPasswordService) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (password: string) => service.execute(password),
    onSuccess: () => {
      const { accessToken, user } = useAuthStore.getState();
      if (accessToken && user) {
        useAuthStore.getState().setAuth(accessToken, { ...user, mustChangePassword: false });
      }
      toast.success(t("auth.confirmPassword.success"));
      void navigate({ to: "/home" });
    },
    onError: (error: AppError) => toast.error(error.message),
  });
}
