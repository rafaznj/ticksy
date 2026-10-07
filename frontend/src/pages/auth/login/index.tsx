import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/auth/login";
import { AuthCarousel } from "@/components/AuthCarousel";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-svh overflow-hidden">
      <TooltipProvider>
        <div className="absolute top-4 right-8 z-20 flex items-center gap-1 rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur-md duration-500 animate-in fade-in-0 slide-in-from-top-2 motion-reduce:animate-none">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </TooltipProvider>
      <AuthCarousel />

      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-background p-4 lg:w-[45%] lg:p-6">
        <Card className="max-h-full w-full max-w-lg overflow-hidden rounded-2xl border shadow-lg duration-700 ease-out animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both motion-reduce:animate-none">
          <CardContent className="px-6 pt-4 pb-4 lg:px-10">
            <LoginForm />
          </CardContent>

          <CardFooter className="flex w-full items-center justify-center py-3 duration-700 animate-in fade-in-0 fill-mode-both [animation-delay:300ms] motion-reduce:animate-none">
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
              <span>{t("auth.login.noAccount")}</span>
              <Button
                variant="link"
                className="h-auto cursor-pointer p-0 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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
