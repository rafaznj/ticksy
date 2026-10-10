import homeLight from "@/assets/images/light-theme/home.gif";
import homeBlack from "@/assets/images/black-theme/home.gif";
import createTicketLight from "@/assets/images/light-theme/create-ticket.gif";
import createTicketBlack from "@/assets/images/black-theme/create-ticket.gif";
import ticketsLight from "@/assets/images/light-theme/tickets.gif";
import ticketsBlack from "@/assets/images/black-theme/tickets.gif";
import usersLight from "@/assets/images/light-theme/users.gif";
import usersBlack from "@/assets/images/black-theme/users.gif";
import notificationsLight from "@/assets/images/light-theme/notifications.gif";
import notificationsBlack from "@/assets/images/black-theme/notifications.gif";
import sidebarLight from "@/assets/images/light-theme/sidebar.gif";
import sidebarBlack from "@/assets/images/black-theme/sidebar.gif";

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
    { id: "home", labelKey: "general.carousel.slides.home", light: homeLight, dark: homeBlack },
    {
      id: "create-ticket",
      labelKey: "general.carousel.slides.createTicket",
      light: createTicketLight,
      dark: createTicketBlack,
    },
    {
      id: "tickets",
      labelKey: "general.carousel.slides.tickets",
      light: ticketsLight,
      dark: ticketsBlack,
    },
    {
      id: "users",
      labelKey: "general.carousel.slides.users",
      light: usersLight,
      dark: usersBlack,
    },
    {
      id: "notifications",
      labelKey: "general.carousel.slides.notifications",
      light: notificationsLight,
      dark: notificationsBlack,
    },
    {
      id: "sidebar",
      labelKey: "general.carousel.slides.sidebar",
      light: sidebarLight,
      dark: sidebarBlack,
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
