import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { TFunction } from "i18next";
import type { SidebarMenuGroup } from "./types";
import { LuHouse, LuTickets, LuUsers } from "react-icons/lu";
import { GrNotification } from "react-icons/gr";

const iconClassName = "text-sidebar-foreground/70";

const allUser = Object.values(UserRoleEnum);
const adminOnly = [UserRoleEnum.admin];

export function getSidebarMenuGroups(t: TFunction, role?: UserRoleEnum): SidebarMenuGroup[] {
  const isAdmin = role === UserRoleEnum.admin;

  return [
    {
      items: [
        {
          href: "/home",
          tooltip: t("sidebar.tooltips.home"),
          icon: LuHouse,
          iconClassName,
          allowedRoles: allUser,
        },
      ],
    },
    {
      items: [
        {
          href: "/tickets",
          tooltip: isAdmin ? t("sidebar.tooltips.tickets") : t("sidebar.tooltips.myTickets"),
          icon: LuTickets,
          iconClassName,
          allowedRoles: allUser,
        },
      ],
    },
    {
      items: [
        {
          href: "/users",
          tooltip: t("sidebar.tooltips.users"),
          icon: LuUsers,
          iconClassName,
          allowedRoles: adminOnly,
        },
      ],
    },
    {
      items: [
        {
          href: "/notifications",
          tooltip: t("sidebar.tooltips.notifications"),
          icon: GrNotification,
          iconClassName,
          allowedRoles: adminOnly,
        },
      ],
    },
  ];
}
