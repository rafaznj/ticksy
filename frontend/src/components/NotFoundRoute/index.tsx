import { BadgeAlert } from "lucide-react";
import useNotFoundRoute from "./hook";
import { Button } from "@/components/ui/button";

export const NotFoundRouteComponent = () => {
  const { navigate, t } = useNotFoundRoute();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-blue-600 px-4">
      <BadgeAlert className="size-40 text-white" strokeWidth={1.5} />

      <p className="text-center text-3xl font-semibold text-white">{t("general.notFoundRoute")}</p>

      <Button
        className="rounded-lg bg-white px-6 py-6 text-xl font-semibold text-blue-600 transition-colors hover:bg-blue-50 cursor-pointer "
        onClick={() => navigate({ to: "/home" })}
      >
        {t("general.actions.back")}
      </Button>
    </div>
  );
};
