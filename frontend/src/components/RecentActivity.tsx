import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import { Avatar, AvatarFallback } from "@/components/primitives/avatar";
import { Badge } from "@/components/primitives/badge";
import { ScrollArea } from "@/components/primitives/scroll-area";

interface Activity {
  id: number;
  user: string;
  initials: string;
  action: string;
  target: string;
  time: string;
  type: "created" | "resolved" | "commented" | "assigned";
}

const activities: Activity[] = [
  {
    id: 1,
    user: "Rafael",
    initials: "RA",
    action: "resolveu o ticket",
    target: "#1042",
    time: "há 5 min",
    type: "resolved",
  },
  {
    id: 2,
    user: "Maria Silva",
    initials: "MS",
    action: "criou o ticket",
    target: "#1043",
    time: "há 15 min",
    type: "created",
  },
  {
    id: 3,
    user: "João Costa",
    initials: "JC",
    action: "comentou no ticket",
    target: "#1038",
    time: "há 1h",
    type: "commented",
  },
  {
    id: 4,
    user: "Ana Souza",
    initials: "AS",
    action: "foi atribuída ao ticket",
    target: "#1040",
    time: "há 2h",
    type: "assigned",
  },
  {
    id: 5,
    user: "Carlos Lima",
    initials: "CL",
    action: "resolveu o ticket",
    target: "#1036",
    time: "há 3h",
    type: "resolved",
  },
  {
    id: 6,
    user: "Beatriz Alves",
    initials: "BA",
    action: "criou o ticket",
    target: "#1041",
    time: "há 4h",
    type: "created",
  },
];

const typeColors = {
  created: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  resolved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
  commented: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  assigned: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
};

const typeLabels = {
  created: "Criado",
  resolved: "Resolvido",
  commented: "Comentário",
  assigned: "Atribuído",
};

const avatarColors = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[340px]">
          <div className="space-y-0">
            {activities.map((activity, i) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 border-b px-6 py-3.5 transition-colors last:border-0 hover:bg-muted/30"
              >
                <Avatar className="mt-0.5 size-8 shrink-0">
                  <AvatarFallback
                    className={`text-xs font-medium ${avatarColors[i % avatarColors.length]}`}
                  >
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium text-primary">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`px-1.5 py-0 text-[10px] font-medium ${typeColors[activity.type]}`}
                    >
                      {typeLabels[activity.type]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
