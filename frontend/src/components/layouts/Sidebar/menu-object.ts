import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { TFunction } from "i18next";
import type { SidebarMenuGroup } from "./types";
import { LuTicket, LuUsers } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";

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
          icon: IoIosHome,
          allowedRoles: allUser,
        },
      ],
    },
    {
      items: [
        {
          href: "/tickets",
          tooltip: isAdmin ? t("sidebar.tooltips.tickets") : t("sidebar.tooltips.myTickets"),
          icon: LuTicket,
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
          icon: LuUsers,
          iconClassName: "text-purple-600 dark:text-purple-400",
          allowedRoles: adminOnly,
        },
      ],
    },
  ];
}
