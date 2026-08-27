import useLanguageToggle from "@/components/LanguageToggle/hook";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { LuLanguages } from "react-icons/lu";

export function LanguageToggle() {
  const { toggleLanguage, language } = useLanguageToggle();
  const { t } = useTranslation();

  const nextLanguage = language === "pt" ? "inglês" : "portuguese";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="relative size-9 cursor-pointer"
        >
          <LuLanguages className="size-[1.1rem]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t("general.language", { language: nextLanguage })}</TooltipContent>
    </Tooltip>
  );
}
