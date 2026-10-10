import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { truncate } from "@/shared/utils/truncate";

interface TruncatedCellProps {
  text?: string;
  maxLength?: number;
  children?: ReactNode;
}

export function TruncatedCell({ text, maxLength = 25, children }: TruncatedCellProps) {
  if (children !== undefined) {
    const value = text ?? "";

    if (value.length > maxLength) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block min-w-0 cursor-pointer truncate border-b border-dotted border-muted-foreground/50">
                {children}
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-100 wrap-break-word" sideOffset={0}>
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <div className="min-w-0 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </div>
    );
  }

  const value = text ?? "";
  const truncatedText = truncate(value, maxLength);
  const isTruncated = value.length > maxLength;

  if (!isTruncated) {
    return <span className="block min-w-0 truncate">{value}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="block cursor-help truncate border-b border-dotted border-muted-foreground/50">
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
