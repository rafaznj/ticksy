import useNotFoundRoute from "./hook";
import { Button } from "@/components/ui/button";
import { TbError404 } from "react-icons/tb";

export const NotFoundRouteComponent = () => {
  const { navigate, t } = useNotFoundRoute();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-blue-300 px-4">
      <img src="/logo.png" className="absolute left-6 top-6 h-10 w-auto" />

      <TbError404 className="size-32 text-white" strokeWidth={1.5} />

      <p className="text-center text-2xl font-semibold text-white">{t("general.notFoundRoute")}</p>

      <Button
        className="cursor-pointer rounded-lg bg-white px-6 py-6 text-xl font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        onClick={() => navigate({ to: "/home" })}
      >
        {t("general.actions.back")}
      </Button>
    </div>
  );
};
