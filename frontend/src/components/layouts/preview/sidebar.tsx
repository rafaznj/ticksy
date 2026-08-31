import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { GrHomeRounded } from "react-icons/gr";
import { LuPlus, LuPencil, LuLogOut, LuTickets } from "react-icons/lu";

interface PreviewSidebarProps {
  activeHref: string;
  onNavigate: (href: string) => void;
  onCreateTicket?: () => void;
  onEditUser?: () => void;
  onLogout?: () => void;
}

const NAV_ITEMS = [
  {
    href: "/home",
    icon: GrHomeRounded,
    labelKey: "sidebar.tooltips.home",
    color: "text-white",
  },
  {
    href: "/tickets",
    icon: LuTickets,
    labelKey: "sidebar.tooltips.tickets",
    color: "text-blue-500 dark:text-blue-400",
  },
] as const;

export function PreviewSidebar({
  activeHref,
  onNavigate,
  onCreateTicket,
  onEditUser,
  onLogout,
}: PreviewSidebarProps) {
  const { t } = useTranslation();

  return (
    <div className="self-center p-2">
      <div className="flex w-14 flex-col items-center gap-5 rounded-lg bg-sidebar py-4 text-sidebar-foreground shadow-sm ring-1 ring-sidebar-border">
        <button
          type="button"
          onClick={onCreateTicket ?? undefined}
          title={t("sidebar.tooltips.newTicket", "Criar ticket")}
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <LuPlus className="size-5 shrink-0" />
        </button>

        <div className="flex flex-1 flex-col gap-5">
          {NAV_ITEMS.map(({ href, icon: Icon, labelKey, color }) => {
            const isActive = href === activeHref;

            return (
              <button
                key={href}
                type="button"
                onClick={() => onNavigate(href)}
                title={t(labelKey)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent ring-1 ring-blue-300 dark:ring-blue-800/60",
                )}
              >
                <Icon className={cn("size-5", color)} />
              </button>
            );
          })}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary transition-colors hover:bg-sidebar-primary/30"
            >
              JD
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@email.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer hover:text-orange-500 focus:text-orange-500 data-highlighted:text-orange-500"
              onSelect={onEditUser}
            >
              <LuPencil className="mr-2 size-4" />
              {t("sidebar.labels.editProfile", "Editar perfil")}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:text-destructive focus:text-destructive data-highlighted:text-destructive"
              onSelect={onLogout}
            >
              <LuLogOut className="mr-2 size-4" />
              {t("sidebar.labels.logout", "Sair")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
