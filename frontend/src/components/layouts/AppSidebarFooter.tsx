import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
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
import { useNavigate } from "@tanstack/react-router";
import { ChevronsUpDown, User, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebarFooter() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarFooter className="p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="h-12 cursor-pointer gap-3 rounded-lg px-2 transition-all hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent"
              >
                <Avatar className="size-8 shrink-0 rounded-lg">
                  <AvatarImage src="" alt="Rafael" />
                  <AvatarFallback className="rounded-lg bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary">
                    RA
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-semibold">Rafael</span>
                    <span className="truncate text-xs text-sidebar-foreground/50">
                      Administrador
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
                  <p className="text-sm font-semibold">Rafael</p>
                  <p className="text-xs text-muted-foreground">admin@ticksy.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate({ to: "/user/profile" })} // TODO: Profile user page
              >
                <User className="mr-2 size-4" />
                {t("sidebar.labels.profile")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => navigate({ to: "/login" })}
              >
                <LogOut className="mr-2 size-4" />
                {t("sidebar.actions.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
