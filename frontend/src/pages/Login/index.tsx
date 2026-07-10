import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { LoginForm } from "@/layouts/forms/LoginForm";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-10 lg:flex lg:w-[55%]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm text-blue-200/40">{t("general.copyright", { year: 2026 })}</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background px-4 lg:w-[45%]">
        <div className="w-full max-w-105 animate-fade-in">
          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="flex flex-col items-center space-y-2 pb-6 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {t("auth.login.title")}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("auth.login.description")}
              </CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
