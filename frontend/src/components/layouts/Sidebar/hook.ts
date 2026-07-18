import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "@/lib/zustand/use-auth";
import type { SidebarMenuGroup } from "./types";
import { getSidebarMenuGroups } from "@/components/layouts/Sidebar/menu-object";

export function useAppSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuthStore();

  const groups = useMemo(() => getSidebarMenuGroups(t), [t]);

  const visibleGroups = useMemo(() => {
    return groups.reduce<SidebarMenuGroup[]>((acc, group) => {
      const items = group.items.filter(
        (item) => user?.role && item.allowedRoles.includes(user.role),
      );

      if (items.length > 0) {
        acc.push({ ...group, items });
      }

      return acc;
    }, []);
  }, [groups, user?.role]);

  const getItemProps = (href: SidebarMenuGroup["items"][number]["href"]) => ({
    isActive: pathname === href,
    onClick: () => navigate({ to: href }),
  });

  return { groups: visibleGroups, getItemProps };
}
