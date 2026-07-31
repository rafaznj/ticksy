import { Home, Ticket, Users } from "lucide-react";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { TFunction } from "i18next";
import type { SidebarMenuGroup } from "./types";

const allUser = Object.values(UserRoleEnum);
const adminOnly = [UserRoleEnum.ADMIN];

export function getSidebarMenuGroups(t: TFunction, role?: UserRoleEnum): SidebarMenuGroup[] {
  const isAdmin = role === UserRoleEnum.ADMIN;

  return [
    {
      items: [
        {
          href: "/home",
          tooltip: t("sidebar.tooltips.home"),
          icon: Home,
          allowedRoles: allUser,
        },
      ],
    },
    {
      items: [
        {
          href: "/tickets",
          tooltip: isAdmin ? t("sidebar.tooltips.tickets") : t("sidebar.tooltips.myTickets"),
          icon: Ticket,
          iconClassName: "text-blue-500 dark:text-blue-400",
          allowedRoles: allUser,
        },
      ],
    },
    {
      tooltip: t("sidebar.tooltips.users"),
      items: [
        {
          href: "/user/users",
          tooltip: t("sidebar.tooltips.users"),
          icon: Users,
          iconClassName: "text-purple-600 dark:text-purple-400",
          allowedRoles: adminOnly,
        },
      ],
    },
  ];
}
