import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { LuCircleCheck, LuInfo, LuLoader, LuOctagonX, LuTriangleAlert } from "react-icons/lu";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      closeButton={true}
      icons={{
        success: <LuCircleCheck className="size-5 text-emerald-500" />,
        info: <LuInfo className="size-5 text-blue-500" />,
        warning: <LuTriangleAlert className="size-5 text-amber-500" />,
        error: <LuOctagonX className="size-5 text-destructive" />,
        loading: <LuLoader className="size-5 animate-spin text-muted-foreground" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast flex flex-row-reverse items-center justify-between w-full rounded-xl border !bg-white/80 !backdrop-blur-md !text-zinc-900 shadow-lg px-4 py-3.5 !border-blue-600 relative",
          description: "!text-zinc-500 text-xs",
          actionButton: "bg-primary text-primary-foreground text-xs font-medium",
          cancelButton: "bg-muted text-muted-foreground text-xs font-medium",

          closeButton:
            "!right-4 !left-[auto] !top-1/2 !-translate-y-1/2 !w-5 !h-5 !opacity-0 !bg-transparent !border-0 !p-0 !shadow-none cursor-pointer z-10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
