import type { PreviewTicket, PreviewUser } from "@/components/layouts/preview/types";

export const PREVIEW_USERS: PreviewUser[] = [
  { id: "u1", name: "Marina Alves" },
  { id: "u2", name: "Thiago Rocha" },
  { id: "u3", name: "Camila Duarte" },
];

export const INITIAL_PREVIEW_TICKETS: PreviewTicket[] = [
  {
    id: "t1",
    title: "Impressora da recepção não liga",
    status: "open",
    priority: "high",
    assignedToId: null,
    assignedToName: null,
    createdAt: "2026-08-20",
  },
  {
    id: "t2",
    title: "Acesso ao sistema financeiro bloqueado",
    status: "inProgress",
    priority: "high",
    assignedToId: "u1",
    assignedToName: "Marina Alves",
    createdAt: "2026-08-19",
  },
  {
    id: "t3",
    title: "Instalar monitor extra na sala 4",
    status: "open",
    priority: "low",
    assignedToId: null,
    assignedToName: null,
    createdAt: "2026-08-18",
  },
  {
    id: "t4",
    title: "Rede Wi-Fi instável no 2º andar",
    status: "open",
    priority: "medium",
    assignedToId: null,
    assignedToName: null,
    createdAt: "2026-08-17",
  },
  {
    id: "t5",
    title: "Troca de cartucho de tinta",
    status: "resolved",
    priority: "low",
    assignedToId: "u2",
    assignedToName: "Thiago Rocha",
    createdAt: "2026-08-15",
  },
];

const MOCK_NEW_TICKET_TITLES = [
  "Solicitação de novo notebook",
  "Erro ao emitir nota fiscal",
  "Configurar VPN de acesso remoto",
  "Substituir cabo de rede da sala 2",
  "Reset de senha do sistema interno",
  "Lentidão no computador da recepção",
];

const MOCK_NEW_TICKET_PRIORITIES: PreviewTicket["priority"][] = ["low", "medium", "high"];

let mockTicketSequence = 0;

export function createMockTicket(): PreviewTicket {
  mockTicketSequence += 1;

  const title = MOCK_NEW_TICKET_TITLES[Math.floor(Math.random() * MOCK_NEW_TICKET_TITLES.length)];
  const priority =
    MOCK_NEW_TICKET_PRIORITIES[Math.floor(Math.random() * MOCK_NEW_TICKET_PRIORITIES.length)];

  return {
    id: `demo-${Date.now()}-${mockTicketSequence}`,
    title,
    status: "open",
    priority,
    assignedToId: null,
    assignedToName: null,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}
