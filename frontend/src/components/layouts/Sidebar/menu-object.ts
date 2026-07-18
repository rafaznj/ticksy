import { Home, Ticket, Users } from "lucide-react";
import { UserRoleEnum } from "@/modules/user/enums/roles.enum";
import type { TFunction } from "i18next";
import type { SidebarMenuGroup } from "./types";

const allUser = Object.values(UserRoleEnum);
const adminOnly = [UserRoleEnum.ADMIN];
const technicalAssistanceOnly = [UserRoleEnum.TECHNICAL_ASSISTANCE];

export function getSidebarMenuGroups(t: TFunction): SidebarMenuGroup[] {
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
          tooltip: t("sidebar.tooltips.tickets"),
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
          allowedRoles: adminOnly || technicalAssistanceOnly,
        },
      ],
    },
  ];
}
