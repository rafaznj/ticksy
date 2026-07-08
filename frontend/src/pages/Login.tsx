import { useNavigate } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/primitives/card";
import { Logo } from "@/components/Logo";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const navigate = useNavigate();
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
          <Logo size="lg" className="text-white" />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
              {t("auth.login.descriptions.featureSupport")}
            </h1>
            <p className="text-lg leading-relaxed text-blue-200/70">
              {t("auth.login.descriptions.featureSupport")}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-blue-200/40">
            {t("auth.login.descriptions.copyright", { 0: "2026" })}
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background px-4 lg:w-[45%]">
        <div className="w-full max-w-105 animate-fade-in">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size="lg" />
          </div>

          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {t("auth.login.titles.welcome")}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {t("auth.login.descriptions.welcome")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
