import chartDark from "@/assets/images/black-theme/chart.png";
import createTicketDark from "@/assets/images/black-theme/create_ticket.png";
import editProfileDark from "@/assets/images/black-theme/edit_profile.png";
import homeDark from "@/assets/images/black-theme/home.png";
import preferencesDark from "@/assets/images/black-theme/preferences.png";
import sidebarDark from "@/assets/images/black-theme/sidebar.png";
import ticketsDark from "@/assets/images/black-theme/tickets.png";
import usersDark from "@/assets/images/black-theme/users.png";

import chartLight from "@/assets/images/light-theme/chart.png";
import createTicketLight from "@/assets/images/light-theme/create_ticket.png";
import editProfileLight from "@/assets/images/light-theme/edit_profile.png";
import homeLight from "@/assets/images/light-theme/home.png";
import preferencesLight from "@/assets/images/light-theme/preferences.png";
import sidebarLight from "@/assets/images/light-theme/sidebar.png";
import ticketsLight from "@/assets/images/light-theme/tickets.png";
import usersLight from "@/assets/images/light-theme/users.png";
import { type CarouselApi } from "@/components/ui/carousel";
import { useTheme } from "next-themes";
import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useAuthCarousel() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const CAROUSEL_OPTIONS = { loop: true, duration: 40 } as const;

  const arrowClass =
    "size-10 rounded-full bg-transparent shadow-none duration-200 [&_svg]:!size-6 " +
    "text-slate-600 hover:bg-transparent hover:text-slate-900 " +
    "dark:text-slate-400 dark:hover:bg-transparent dark:hover:text-white";

  const slides = [
    { id: "home", labelKey: "general.carousel.slides.home", light: homeLight, dark: homeDark },
    { id: "chart", labelKey: "general.carousel.slides.chart", light: chartLight, dark: chartDark },
    {
      id: "create-ticket",
      labelKey: "general.carousel.slides.createTicket",
      light: createTicketLight,
      dark: createTicketDark,
    },
    {
      id: "tickets",
      labelKey: "general.carousel.slides.tickets",
      light: ticketsLight,
      dark: ticketsDark,
    },
    { id: "users", labelKey: "general.carousel.slides.users", light: usersLight, dark: usersDark },
    {
      id: "sidebar",
      labelKey: "general.carousel.slides.sidebar",
      light: sidebarLight,
      dark: sidebarDark,
    },
    {
      id: "edit-profile",
      labelKey: "general.carousel.slides.editProfile",
      light: editProfileLight,
      dark: editProfileDark,
    },
    {
      id: "preferences",
      labelKey: "general.carousel.slides.preferences",
      light: preferencesLight,
      dark: preferencesDark,
    },
  ] as const;

  const currentSlide = slides[selectedIndex] ?? slides[0];

  return {
    slides,
    currentSlide,
    CAROUSEL_OPTIONS,
    selectedIndex,
    isDark,
    arrowClass,
    api,
    t,
    setApi,
  };
}
