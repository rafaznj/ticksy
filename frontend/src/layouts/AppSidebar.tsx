import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/primitives/sidebar";
import { AppSidebarFooter } from "@/layouts/AppSidebarFooter";
import { Home, Ticket, Clock, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent className="px-2 py-2">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Home"
                  className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Home className="size-5" />
                  {t("layout.sidebar.labels.home")}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold px-3 text-sidebar-foreground/50 uppercase tracking-wider">
              {t("layout.sidebar.titles.tickets")}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Abertos"
                    className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Ticket className="size-5 text-white" />
                    {t("layout.sidebar.labels.openTickets")}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Aguardando"
                    className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Clock className="size-5 text-yellow-300" />
                    {t("layout.sidebar.labels.waitingTickets")}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Concluídos"
                    className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CheckCircle className="size-5 text-green-400" />
                    {t("layout.sidebar.labels.finishedTickets")}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <AppSidebarFooter />
      </Sidebar>
    </>
  );
}
