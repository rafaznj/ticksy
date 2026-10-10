import { useAuthCarousel } from "@/components/auth/Carousel/hook";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "cn";

export function AuthCarousel() {
  const {
    CAROUSEL_OPTIONS,
    slides,
    currentSlide,
    selectedIndex,
    isDark,
    arrowClass,
    api,
    t,
    setApi,
  } = useAuthCarousel();

  return (
    <div className="relative hidden min-w-0 overflow-hidden bg-slate-300 lg:flex lg:w-[55%] lg:items-center lg:justify-center lg:px-16 lg:py-10 dark:bg-slate-900">
      <div className="w-full max-w-4xl duration-1000 animate-in fade-in-0 slide-in-from-left-4 fill-mode-both motion-reduce:animate-none">
        <Carousel className="w-full" opts={CAROUSEL_OPTIONS} setApi={setApi}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id}>
                <div
                  className={cn(
                    "aspect-video w-full overflow-hidden rounded-2xl bg-slate-200 p-1.5",
                    "dark:bg-slate-800",
                    "transition-[transform,opacity] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    index === selectedIndex ? "scale-100 opacity-100" : "scale-[0.94] opacity-30",
                  )}
                >
                  <div className="size-full overflow-hidden rounded-xl">
                    <img
                      key={isDark ? "dark" : "light"}
                      src={isDark ? slide.dark : slide.light}
                      alt=""
                      draggable={false}
                      className={cn(
                        "size-full scale-[1.03] object-contain select-none duration-500 animate-in fade-in-0 motion-reduce:animate-none",
                        isDark ? "bg-slate-950" : "bg-white",
                      )}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            variant="ghost"
            className={cn(arrowClass, "-left-12 hover:-translate-x-0.5 cursor-pointer")}
          />
          <CarouselNext
            variant="ghost"
            className={cn(arrowClass, "-right-12 hover:translate-x-0.5 cursor-pointer")}
          />
        </Carousel>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div aria-live="polite">
            <p
              key={currentSlide.id}
              className="text-sm font-medium text-slate-700 duration-300 animate-in fade-in-0 slide-in-from-bottom-1 motion-reduce:animate-none dark:text-slate-200"
            >
              {t(currentSlide.labelKey)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={t("general.carousel.goToSlide", {
                    defaultValue: "Ir para o slide {{number}}",
                    number: index + 1,
                  })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 ease-out outline-none motion-reduce:transition-none",
                    "focus-visible:ring-2 focus-visible:ring-slate-900/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300",
                    "dark:focus-visible:ring-white/60 dark:focus-visible:ring-offset-slate-900",
                    isActive
                      ? "w-6 bg-slate-900 dark:bg-white"
                      : "w-2 bg-slate-900/30 hover:bg-slate-900/50 dark:bg-white/30 dark:hover:bg-white/60",
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
