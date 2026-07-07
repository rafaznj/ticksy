import useLanguageToggle from "@/components/LanguageToggle/hook";
import { Button } from "@/components/primitives/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { toggleLanguage } = useLanguageToggle();
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="relative size-9 cursor-pointer"
          aria-label={t("layout.header.languageToggle.ariaLabel")}
        >
          <Languages className="size-[1.1rem]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("layout.header.languageToggle.tooltip")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
