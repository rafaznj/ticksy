import { CreateTicketForm } from "@/components/forms/ticket/create";
import { AppSidebarFooter } from "@/components/layouts/AppSidebarFooter";
import { useAppSidebar } from "@/components/layouts/Sidebar/hook";
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
import { useDialog } from "@/contexts/use-dialog";
import { cn } from "@/lib/utils";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const { t } = useTranslation();
  const { groups, getItemProps } = useAppSidebar();
  const { open: openCreateTicketDialog } = useDialog(DIALOG_KEYS.CREATE_TICKET);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="px-2 pt-6 pb-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              tooltip={t("sidebar.tooltips.newTicket")}
              onClick={openCreateTicketDialog}
              className="h-10 gap-2 justify-center rounded-lg bg-primary text-sm text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground px-5 mx-auto group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:p-0"
            >
              <Plus className="size-5 shrink-0" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6 py-3">
        {groups.map((group, index) => (
          <SidebarGroup key={group.tooltip ?? index}>
            {group.tooltip && (
              <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {group.tooltip}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const { isActive, onClick } = getItemProps(item.href);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        tooltip={item.tooltip}
                        onClick={onClick}
                        isActive={isActive}
                        className="h-12 gap-3 rounded-lg px-3 text-base transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:ring-1 data-active:ring-blue-300 dark:data-active:ring-blue-800/60"
                      >
                        <Icon className={cn("size-6", item.iconClassName)} />
                        <span className="truncate text-[15px] font-medium group-data-[collapsible=icon]:hidden">
                          {item.tooltip}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <AppSidebarFooter />

      <CreateTicketForm />
    </Sidebar>
  );
}
