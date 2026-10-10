import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const currentTheme = isDark ? t("general.theme.options.dark") : t("general.theme.options.light");
  const Icon = isDark ? LuMoon : LuSun;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-transform duration-200 active:scale-90"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <Icon
            key={isDark ? "moon" : "sun"}
            className="size-[1.1rem] duration-500 animate-in fade-in-0 spin-in-90 motion-reduce:animate-none"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={3}>{currentTheme}</TooltipContent>
    </Tooltip>
  );
}
