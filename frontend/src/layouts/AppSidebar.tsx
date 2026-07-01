import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";

import { CheckCircle, Clock, Home, LogOut, Ticket, User } from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
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
                      Home
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold px-3 text-sidebar-foreground/50 uppercase tracking-wider">
                  Seus Tickets
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Abertos"
                        className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <Ticket className="size-5 text-white" />
                        Abertos
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Aguardando"
                        className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <Clock className="size-5 text-yellow-300" />
                        Aguardando
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Concluídos"
                        className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <CheckCircle className="size-5 text-green-400" />
                        Concluídos
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-2 py-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Editar usuário"
                    className="h-11 text-base gap-3 px-3 rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <User className="size-5" />
                    Editar usuário
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate({ to: "/login" })}
                    tooltip="Sair"
                    className="h-11 text-base gap-3 px-3 rounded-lg transition-all text-red-300 hover:bg-sidebar-accent hover:text-red-300"
                  >
                    <LogOut className="size-5" />
                    Sair
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <SidebarTrigger />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
