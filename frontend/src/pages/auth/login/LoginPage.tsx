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
      <div className="relative hidden overflow-hidden bg-slate-900 lg:flex lg:w-[55%]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <div className="flex flex-1 items-center justify-center py-6">
            {/* <DemoPreview /> */}
          </div>
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
