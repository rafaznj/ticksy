import { CircleX } from "lucide-react";
import useNotFoundRoute from "./hook";
import { Button } from "@/components/ui/button";

export const NotFoundRouteComponent = () => {
  const { navigate, t } = useNotFoundRoute();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CircleX className="size-20 text-red-500" />

      <p className="text-lg text-muted-foreground">{t("general.actions.back")}</p>

      <Button
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        onClick={() => navigate({ to: "/home" })}
      >
        {t("general.actions.back")}
      </Button>
    </div>
  );
};
