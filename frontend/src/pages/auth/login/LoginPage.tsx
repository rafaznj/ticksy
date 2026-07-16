import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LoginForm } from "@/pages/auth/login/form";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 lg:flex lg:w-[55%]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Ticksy</h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
              Manage your tickets with speed, organization and simplicity.
            </p>
          </div>

          <p className="text-sm text-slate-400">{t("general.copyright", { year: 2026 })}</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-[45%]">
        <Card className="w-full max-w-lg rounded-2xl border shadow-lg">
          <CardContent className="pt-6 px-10 pb-6">
            <LoginForm />
          </CardContent>

          <CardFooter className="w-full flex justify-center items-center py-5">
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-base text-muted-foreground">
              <span>{t("auth.login.noAccount")}</span>
              <Button
                variant="link"
                className="h-auto p-0 text-base font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                onClick={() => navigate({ to: "/register" })}
              >
                {t("auth.login.actions.createAccount")}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
