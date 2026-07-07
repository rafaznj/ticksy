import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { icon: "size-5", text: "text-lg" },
  md: { icon: "size-6", text: "text-xl" },
  lg: { icon: "size-8", text: "text-2xl" },
};

export function Logo({ collapsed = false, size = "md", className }: LogoProps) {
  const s = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 p-1.5 shadow-md shadow-blue-500/20">
        <Ticket className={cn(s.icon, "text-white")} />
      </div>
      {!collapsed && (
        <span className={cn(s.text, "font-bold tracking-tight transition-opacity duration-200")}>
          Ticksy
        </span>
      )}
    </div>
  );
}
