import { AppSidebarFooter } from "@/components/layouts/AppSidebarFooter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, Ticket, Clock, CheckCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={t("sidebar.tooltips.home")}
                onClick={() => navigate({ to: "/home" })}
                isActive={pathname === "/home"}
                className="h-11 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Home className="size-5" />
                {t("sidebar.labels.home")}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {t("sidebar.titles.tickets")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.openTickets")}
                  onClick={() => navigate({ to: "/tickets/open" })}
                  isActive={pathname === "/tickets/open"}
                  className="h-11 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Ticket className="size-5 text-blue-500 dark:text-blue-400" />
                  {t("sidebar.labels.openTickets")}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.waitingTickets")}
                  onClick={() => navigate({ to: "/tickets/waiting" })}
                  isActive={pathname === "/tickets/waiting"}
                  className="h-11 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Clock className="size-5 text-amber-500 dark:text-amber-400" />
                  {t("sidebar.labels.waitingTickets")}
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.finishedTickets")}
                  onClick={() => navigate({ to: "/tickets/finished" })}
                  isActive={pathname === "/tickets/finished"}
                  className="h-11 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CheckCircle className="size-5 text-emerald-500 dark:text-emerald-400" />
                  {t("sidebar.labels.finishedTickets")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {t("sidebar.titles.social")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.users")}
                  onClick={() => navigate({ to: "/user/users" })}
                  isActive={pathname === "/user/users"}
                  className="h-11 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Users className="size-5 text-purple-600 dark:text-purple-400" />
                  {t("sidebar.labels.users")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}
