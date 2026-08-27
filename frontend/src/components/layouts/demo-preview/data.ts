import type { DemoTicket, DemoUser } from "@/components/layouts/demo-preview/types";

export const DEMO_USERS: DemoUser[] = [
  { id: "u1", name: "Marina Alves" },
  { id: "u2", name: "Thiago Rocha" },
  { id: "u3", name: "Camila Duarte" },
];

export const INITIAL_DEMO_TICKETS: DemoTicket[] = [
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
