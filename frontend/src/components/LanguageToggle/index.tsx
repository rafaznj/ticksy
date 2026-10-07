import { useLanguageToggle } from "@/components/LanguageToggle/hook";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LanguageToggle() {
  const { language, currentLanguage, toggleLanguage } = useLanguageToggle();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full transition-transform duration-200 active:scale-90"
          onClick={toggleLanguage}
        >
          <span
            key={language}
            className="text-xs font-semibold uppercase duration-300 ease-out animate-in fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none"
          >
            {language}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={3}>{currentLanguage}</TooltipContent>
    </Tooltip>
  );
}
