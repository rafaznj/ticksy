import { ConfirmPasswordForm } from "@/forms/auth/confirmPassword";

import { ThemeToggle } from "@/components/preferences/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageToggle } from "@/components/preferences/LanguageToggle";

export function ConfirmPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-6">
      <TooltipProvider>
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur-md duration-500 animate-in fade-in-0 slide-in-from-top-2 motion-reduce:animate-none sm:top-4 sm:right-8">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </TooltipProvider>
      <ConfirmPasswordForm />
    </div>
  );
}
