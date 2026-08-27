export interface DemoTicket {
  id: string;
  title: string;
  status: "open" | "inProgress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  assignedToId: string | null;
  assignedToName: string | null;
  createdAt: string;
}

export interface DemoUser {
  id: string;
  name: string;
}

export type DemoStep = "idle" | "assign-open" | "assigning" | "assigned";

export const STATUS_STYLES: Record<DemoTicket["status"], string> = {
  open: "bg-blue-100 text-blue-700",
  inProgress: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

export const PRIORITY_STYLES: Record<DemoTicket["priority"], string> = {
  low: "text-muted-foreground",
  medium: "text-amber-600",
  high: "text-red-600 font-semibold",
  urgent: "text-red-800 font-bold",
};
