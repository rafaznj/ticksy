import { Button } from "@/components/primitives/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/primitives/tooltip";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SettingsButton() {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => alert("Configurações")}
          className="relative size-9 cursor-pointer"
        >
          <Settings className="size-[1.1rem]" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("general.settings")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
