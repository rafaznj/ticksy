import { ConfirmPasswordPage } from "@/pages/auth/confirmPassword";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/zustand/use-auth";

export const Route = createFileRoute("/confirm-password")({
  beforeLoad: () => {
    const { accessToken, user } = useAuthStore.getState();
    if (!accessToken || !user?.mustChangePassword) {
      throw redirect({ to: accessToken ? "/home" : "/login" });
    }
  },
  component: ConfirmPasswordPage,
});
