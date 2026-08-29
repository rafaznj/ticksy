import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { TFunction } from "i18next";
import type { SidebarMenuGroup } from "./types";
import { GrHomeRounded } from "react-icons/gr";
import { PiUsers } from "react-icons/pi";
import { LuTickets } from "react-icons/lu";

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
          icon: GrHomeRounded,
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
          icon: PiUsers,
          iconClassName: "text-purple-600 dark:text-purple-400",
          allowedRoles: adminOnly,
        },
      ],
    },
  ];
}
