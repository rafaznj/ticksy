import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useSidebar,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { useLogout } from "@/modules/auth/query-hooks/mutation/use-logout";
import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown, User, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebarFooter() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const { user } = useAuthStore();
  const { mutate: handleLogout } = useLogout();
  const collapsed = state === "collapsed";

  return (
    <SidebarFooter className="gap-2 p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                tooltip={t("sidebar.tooltips.profile")}
                size="lg"
                className="h-12 cursor-pointer gap-3 rounded-lg px-2 transition-all hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent"
              >
                <Avatar className="size-8 shrink-0 rounded-lg">
                  <AvatarFallback
                    className="rounded-lg bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary"
                    name={user?.name}
                  />
                </Avatar>
                {!collapsed && (
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-semibold">{user?.name}</span>
                    <span className="truncate text-xs text-sidebar-foreground/50">
                      {user?.role && t(`user.roles.${user.role}`)}
                    </span>
                  </div>
                )}
                {!collapsed && (
                  <ChevronsUpDown className="ml-auto size-4 shrink-0 text-sidebar-foreground/40" />
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer hover:text-orange-500 focus:text-orange-500 data-highlighted:text-orange-500"
                onClick={() =>
                  navigate({
                    to: "/user/profile",
                    search: {
                      redirect: location.pathname,
                    },
                  })
                }
              >
                <User className="mr-2 size-4" />
                {t("sidebar.labels.editProfile")}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer hover:text-destructive focus:text-destructive data-highlighted:text-destructive"
                onClick={() => handleLogout()}
              >
                <LogOut className="mr-2 size-4" />
                {t("sidebar.labels.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
