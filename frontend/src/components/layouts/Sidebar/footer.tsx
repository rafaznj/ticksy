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
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { useLogout } from "@/modules/auth/query-hooks/mutation/use-logout";
import { useTranslation } from "react-i18next";
import { LuLogOut, LuPencil, LuSlidersHorizontal } from "react-icons/lu";
import { UserProfileEditForm } from "@/forms/user/profile-edit";
import { useDialog } from "@/hooks/use-dialog";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { UserPreferencesForms } from "@/forms/user/preferences";

export function AppSidebarFooter() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const { mutate: handleLogout } = useLogout();

  const { open: openProfileEdit } = useDialog(DIALOG_KEYS.PROFILE_EDIT);
  const { open: openPreferences } = useDialog(DIALOG_KEYS.PREFERENCES);

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
                <span className="min-w-0 truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
                  {user?.name}
                </span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
              <DropdownMenuLabel className="p-3 font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10 shrink-0 rounded-lg">
                    <AvatarFallback
                      className="rounded-lg bg-sidebar-primary/20 text-sm font-semibold text-sidebar-primary"
                      name={user?.name}
                    />
                  </Avatar>

                  <div className="flex min-w-0 flex-col">
                    <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-1 p-1">
                <DropdownMenuItem
                  className="cursor-pointer transition-colors hover:text-foreground focus:text-foreground"
                  onClick={() => openProfileEdit()}
                >
                  <LuPencil className="mr-2 size-4 text-muted-foreground" />
                  {t("sidebar.labels.editProfile")}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer transition-colors hover:text-foreground focus:text-foreground"
                  onClick={() => openPreferences()}
                >
                  <LuSlidersHorizontal className="mr-2 size-4 text-muted-foreground" />
                  {t("sidebar.labels.preferences")}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer transition-colors hover:text-destructive focus:text-destructive"
                  onClick={() => handleLogout()}
                >
                  <LuLogOut className="mr-2 size-4 text-destructive" />
                  {t("sidebar.labels.logout")}
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <UserProfileEditForm />
      <UserPreferencesForms />
    </SidebarFooter>
  );
}
