import { AppSidebarFooter } from "@/components/layouts/AppSidebarFooter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, Ticket, Clock, CheckCircle, Users, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="px-2 pt-6 pb-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              onClick={() => alert("abri dialog")}
              className="h-10 gap-2 justify-center rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground px-5 mx-auto group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0"
            >
              <Plus className="size-5 shrink-0" />
              <span className="truncate font-medium group-data-[collapsible=icon]:hidden">
                {t("sidebar.actions.newTicket")}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6 py-3">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={t("sidebar.tooltips.home")}
                onClick={() => navigate({ to: "/home" })}
                isActive={pathname === "/home"}
                className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
              >
                <Home className="size-6" />
                <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                  {t("sidebar.labels.home")}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            {t("sidebar.titles.tickets")}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.totalTickets")}
                  onClick={() => navigate({ to: "/tickets/total" })}
                  isActive={pathname === "/tickets/total"}
                  className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
                >
                  <Ticket className="size-6 text-blue-500 dark:text-blue-400" />
                  <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                    {t("sidebar.labels.totalTickets")}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.openTickets")}
                  onClick={() => navigate({ to: "/tickets/open" })}
                  isActive={pathname === "/tickets/open"}
                  className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
                >
                  <Clock className="size-6 text-amber-500 dark:text-amber-400" />
                  <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                    {t("sidebar.labels.openTickets")}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("sidebar.tooltips.resolvedTickets")}
                  onClick={() => navigate({ to: "/tickets/resolved" })}
                  isActive={pathname === "/tickets/resolved"}
                  className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
                >
                  <CheckCircle className="size-6 text-emerald-500 dark:text-emerald-400" />
                  <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                    {t("sidebar.labels.resolvedTickets")}
                  </span>
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
                  className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
                >
                  <Users className="size-6 text-purple-600 dark:text-purple-400" />
                  <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                    {t("sidebar.labels.users")}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <AppSidebarFooter />
    </Sidebar>
  );
}
