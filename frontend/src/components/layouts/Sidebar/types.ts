import type { UserRoleEnum } from "@/modules/user/enums/role.enum";
import type { FileRouteTypes } from "@/routeTree.gen";
import type { IconType } from "react-icons/lib";

export interface SidebarMenuItem {
  href: FileRouteTypes["to"];
  tooltip: string;
  icon: IconType;
  iconClassName?: string;
  allowedRoles: UserRoleEnum[];
}

export interface SidebarMenuGroup {
  tooltip?: string;
  items: SidebarMenuItem[];
}
