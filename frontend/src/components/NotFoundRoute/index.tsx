import useNotFoundRoute from "./hook";
import { Button } from "@/components/ui/button";
import { LuHouse } from "react-icons/lu";

export const NotFoundRouteComponent = () => {
  const { navigate, t } = useNotFoundRoute();

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <header className="absolute left-0 top-0 w-full px-6 py-6 md:px-10">
        <img src="/logo.png" alt="Logo" className="h-9 w-auto" />
      </header>

      <section className="flex flex-1 items-center justify-center px-6">
        <div className="relative flex w-full max-w-xl flex-col items-center text-center">
          <span className="absolute -top-20 select-none font-mono text-[9rem] font-bold leading-none tracking-tighter text-foreground/5 md:-top-28 md:text-[12rem]">
            404
          </span>

          <div className="relative flex flex-col items-center text-center">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("general.notFoundRoute.title")}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-base leading-7 text-muted-foreground md:text-lg">
              {t("general.notFoundRoute.description")}
            </p>

            <Button
              className="mt-8 cursor-pointer px-6 py-6"
              onClick={() => navigate({ to: "/home" })}
            >
              <LuHouse />
              {t("general.actions.back")}
            </Button>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-3 left-4 z-10 font-mono text-xs text-muted-foreground">
        <div>
          {t("general.copyright", {
            year: new Date().getFullYear(),
          })}
        </div>

        <div className="mt-1">
          <span className="font-semibold text-foreground/70">Rafael Sena</span>

          <span className="mx-1.5 text-muted-foreground/50">·</span>

          <a
            href="https://rafaelsena.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            @rafaznj
          </a>
        </div>
      </footer>
    </main>
  );
};
