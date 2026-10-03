import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { truncate } from "@/shared/utils/truncate";

interface TruncatedCellProps {
  text: string;
  maxLength?: number;
}

export function TruncatedCell({ text, maxLength = 25 }: TruncatedCellProps) {
  const truncatedText = truncate(text, maxLength);
  const isTruncated = text && text.length > maxLength;

  if (!isTruncated) {
    return <span>{text}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-muted-foreground/50">
            {truncatedText}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-100 wrap-break-word">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
