import { getSidebarMenuGroups } from "@/components/layouts/Sidebar/menu-object";
import { cn } from "@/lib/utils";
import { UserRoleEnum } from "@/modules/user/enums/role.enum";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

interface DemoSidebarProps {
  activeHref: string;
  onInteract: () => void;
}

export function DemoSidebar({ activeHref, onInteract }: DemoSidebarProps) {
  const { t } = useTranslation();
  const groups = useMemo(() => getSidebarMenuGroups(t, UserRoleEnum.ADMIN), [t]);

  const visibleGroups = groups.reduce<typeof groups>((acc, group) => {
    const items = group.items.filter((item) => item.allowedRoles.includes(UserRoleEnum.ADMIN));
    if (items.length > 0) acc.push({ ...group, items });
    return acc;
  }, []);

  const allItems = visibleGroups.flatMap((group) => group.items);

  return (
    <div className="flex h-full w-16 shrink-0 flex-col items-center gap-4 bg-sidebar py-4 text-sidebar-foreground">
      <button
        type="button"
        onClick={onInteract}
        className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <LuPlus className="size-5 shrink-0" />
      </button>

      <div className="flex flex-1 flex-col gap-2">
        {allItems.map((item) => {
          const isActive = item.href === activeHref;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              type="button"
              onClick={onInteract}
              title={item.tooltip}
              className={cn(
                "flex size-10 items-center justify-center rounded-lg transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent ring-1 ring-blue-300 dark:ring-blue-800/60",
              )}
            >
              <Icon className={cn("size-5", item.iconClassName)} />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onInteract}
        className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary/20 text-xs font-semibold text-sidebar-primary transition-colors hover:bg-sidebar-primary/30"
      >
        AD
      </button>
    </div>
  );
}
