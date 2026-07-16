import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      closeButton={true}
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-destructive" />,
        loading: <Loader2Icon className="size-5 animate-spin text-muted-foreground" />,
      }}
      toastOptions={{
        classNames: {
          // 1. Adicionado 'flex-row-reverse justify-between' para jogar o ícone para a direita
          // e manter o texto alinhado à esquerda.
          toast:
            "group toast flex flex-row-reverse items-center justify-between w-full rounded-xl border !bg-white/80 !backdrop-blur-md !text-zinc-900 shadow-lg px-4 py-3.5 !border-blue-600 relative",
          description: "!text-zinc-500 text-xs",
          actionButton: "bg-primary text-primary-foreground text-xs font-medium",
          cancelButton: "bg-muted text-muted-foreground text-xs font-medium",

          // 2. Ajustado para o lado direito:
          // - Mudamos '!left-4 !right-[auto]' para '!right-4 !left-[auto]' para que a área de clique
          // invisível fique exatamente em cima do ícone no canto direito.
          closeButton:
            "!right-4 !left-[auto] !top-1/2 !-translate-y-1/2 !w-5 !h-5 !opacity-0 !bg-transparent !border-0 !p-0 !shadow-none cursor-pointer z-10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
