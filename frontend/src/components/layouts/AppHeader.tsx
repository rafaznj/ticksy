import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { LanguageToggle } from "@/components/LanguageToggle";

const notifications = [
  {
    id: 1,
    title: "Novo ticket atribuído",
    description: "Ticket #1042 foi atribuído a você",
    time: "5 min atrás",
    read: false,
  },
  {
    id: 2,
    title: "Ticket resolvido",
    description: "Ticket #1038 foi marcado como concluído",
    time: "1h atrás",
    read: false,
  },
  {
    id: 3,
    title: "Comentário adicionado",
    description: "Maria comentou no Ticket #1035",
    time: "3h atrás",
    read: true,
  },
];

export function AppHeader() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex flex-col gap-4 border-b bg-background/80 px-4 py-4 backdrop-blur-sm md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator orientation="vertical" className="mr-1 hidden h-5 md:block" />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative size-9 cursor-pointer">
                <Bell className="size-[1.1rem]" />
                {unreadCount > 0 && (
                  <Badge className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full p-0 text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="border-b px-4 py-3">
                <h4 className="text-sm font-semibold">Notificações</h4>
                <p className="text-xs text-muted-foreground">
                  {unreadCount} não lida{unreadCount !== 1 && "s"}
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex cursor-pointer flex-col gap-1 border-b px-4 py-3 transition-colors last:border-0 hover:bg-muted/50 ${
                      !n.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium">{n.title}</p>
                      {!n.read && <div className="mt-1 size-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="text-xs text-muted-foreground/60">{n.time}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
