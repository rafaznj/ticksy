import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import { Badge } from "@/components/primitives/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

interface Ticket {
  id: string;
  title: string;
  status: "aberto" | "aguardando" | "concluído";
  priority: "baixa" | "média" | "alta" | "urgente";
  date: string;
  assignee: string;
}

const tickets: Ticket[] = [
  {
    id: "#1043",
    title: "Erro ao exportar relatório PDF",
    status: "aberto",
    priority: "alta",
    date: "04/07/2026",
    assignee: "Maria Silva",
  },
  {
    id: "#1042",
    title: "Lentidão na tela de dashboard",
    status: "aguardando",
    priority: "média",
    date: "03/07/2026",
    assignee: "Rafael",
  },
  {
    id: "#1041",
    title: "Botão de salvar não responde",
    status: "aberto",
    priority: "urgente",
    date: "03/07/2026",
    assignee: "João Costa",
  },
  {
    id: "#1040",
    title: "Atualizar permissões de usuário",
    status: "concluído",
    priority: "baixa",
    date: "02/07/2026",
    assignee: "Ana Souza",
  },
  {
    id: "#1039",
    title: "Integração com API de pagamentos",
    status: "aguardando",
    priority: "alta",
    date: "01/07/2026",
    assignee: "Carlos Lima",
  },
];

const statusStyles = {
  aberto: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  aguardando: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  concluído: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
};

const priorityStyles = {
  baixa: "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400",
  média: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  alta: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  urgente: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
};

export function RecentTicketsTable() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Tickets Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-20 pl-6">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="hidden md:table-cell">Responsável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Prioridade</TableHead>
              <TableHead className="hidden lg:table-cell pr-6">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="cursor-pointer transition-colors">
                <TableCell className="pl-6 font-mono text-sm font-medium text-primary">
                  {ticket.id}
                </TableCell>
                <TableCell className="max-w-[200px] truncate font-medium">{ticket.title}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {ticket.assignee}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`capitalize ${statusStyles[ticket.status]}`}
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant="secondary"
                    className={`capitalize ${priorityStyles[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell pr-6">
                  {ticket.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
