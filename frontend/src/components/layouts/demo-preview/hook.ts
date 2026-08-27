import { useCallback, useRef, useState } from "react";
import { type DemoStep, type DemoTicket } from "@/components/layouts/demo-preview/types";
import { DEMO_USERS, INITIAL_DEMO_TICKETS } from "@/components/layouts/demo-preview/data";

export function useDemoPreview() {
  const [tickets, setTickets] = useState<DemoTicket[]>(INITIAL_DEMO_TICKETS);
  const [step, setStep] = useState<DemoStep>("idle");
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeTicketIdRef = useRef<string | null>(null);
  const selectedUserIdRef = useRef<string | null>(null);

  activeTicketIdRef.current = activeTicketId;
  selectedUserIdRef.current = selectedUserId;

  const activeTicket = tickets.find((t) => t.id === activeTicketId) ?? null;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const openAssignFor = useCallback((ticketId: string) => {
    setActiveTicketId(ticketId);
    setSelectedUserId(null);
    setStep("assign-open");
  }, []);

  const selectUser = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  const closeDialog = useCallback(() => {
    clearTimer();
    setStep("idle");
    setActiveTicketId(null);
    setSelectedUserId(null);
  }, []);

  const confirmAssign = useCallback(() => {
    setStep("assigning");

    timerRef.current = setTimeout(() => {
      const userId = selectedUserIdRef.current;
      const ticketId = activeTicketIdRef.current;
      const user = DEMO_USERS.find((u) => u.id === userId);

      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? { ...t, assignedToId: userId, assignedToName: user?.name ?? null }
            : t,
        ),
      );
      setStep("assigned");

      timerRef.current = setTimeout(() => {
        setStep("idle");
        setActiveTicketId(null);
        setSelectedUserId(null);
      }, 1600);
    }, 500);
  }, []);

  return {
    tickets,
    step,
    activeTicket,
    selectedUserId,
    openAssignFor,
    selectUser,
    confirmAssign,
    closeDialog,
  };
}
