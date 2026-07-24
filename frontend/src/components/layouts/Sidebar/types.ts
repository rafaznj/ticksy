import type { LucideIcon } from "lucide-react";
import type { UserRoleEnum } from "@/modules/user/enums/user-role.enum";
import type { FileRouteTypes } from "@/routeTree.gen";

export interface SidebarMenuItem {
  href: FileRouteTypes["to"];
  tooltip: string;
  icon: LucideIcon;
  iconClassName?: string;
  allowedRoles: UserRoleEnum[];
}

export interface SidebarMenuGroup {
  tooltip?: string;
  items: SidebarMenuItem[];
}
