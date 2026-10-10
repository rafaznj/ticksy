import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RegisterForm } from "@/forms/auth/register";
import { ThemeToggle } from "@/components/preferences/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthCarousel } from "@/components/auth/Carousel";
import { LanguageToggle } from "@/components/preferences/LanguageToggle";

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-svh overflow-hidden">
      <TooltipProvider>
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur-md duration-500 animate-in fade-in-0 slide-in-from-top-2 motion-reduce:animate-none sm:top-4 sm:right-8">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </TooltipProvider>
      <AuthCarousel />

      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-background p-4 lg:w-[45%] lg:p-6">
        <Card className="max-h-full w-full max-w-lg overflow-hidden rounded-2xl border shadow-lg duration-700 ease-out animate-in fade-in-0 slide-in-from-bottom-4 fill-mode-both motion-reduce:animate-none">
          <CardContent className="px-6 pt-4 pb-4 lg:px-10">
            <RegisterForm />
          </CardContent>

          <CardFooter className="flex w-full items-center justify-center py-3 duration-700 animate-in fade-in-0 fill-mode-both [animation-delay:300ms] motion-reduce:animate-none">
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
              <span>{t("auth.register.alreadyHaveAccount")}</span>
              <Button
                variant="link"
                className="h-auto cursor-pointer p-0 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => navigate({ to: "/login" })}
              >
                {t("auth.register.actions.signIn")}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
