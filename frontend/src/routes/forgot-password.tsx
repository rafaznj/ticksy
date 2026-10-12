import { ForgotPasswordPage } from "@/pages/auth/forgotPassword";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});
