import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { type PreviewStep, type PreviewTicket } from "@/components/layouts/preview/types";
import {
  PREVIEW_USERS,
  INITIAL_PREVIEW_TICKETS,
  createMockTicket,
} from "@/components/layouts/preview/data";

const TOAST_DURATION_MS = 3000;

export function usePreview() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<PreviewTicket[]>(INITIAL_PREVIEW_TICKETS);
  const [step, setStep] = useState<PreviewStep>("idle");
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), TOAST_DURATION_MS);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToastMessage(null);
  }, []);

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
      const user = PREVIEW_USERS.find((u) => u.id === userId);

      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? { ...t, assignedToId: userId, assignedToName: user?.name ?? null }
            : t,
        ),
      );
      setStep("assigned");
      showToast(t("ticket.assign.messages.success"));

      timerRef.current = setTimeout(() => {
        setStep("idle");
        setActiveTicketId(null);
        setSelectedUserId(null);
      }, 1600);
    }, 500);
  }, [t, showToast]);

  const createTicket = useCallback(() => {
    const newTicket = createMockTicket();
    setTickets((prev) => [newTicket, ...prev]);
    showToast(
      t("ticket.create.messages.success", {
        defaultValue: 'Ticket "{{title}}" criado com sucesso!',
        title: newTicket.title,
      }),
    );
  }, [t, showToast]);

  return {
    tickets,
    step,
    activeTicket,
    selectedUserId,
    toastMessage,
    openAssignFor,
    selectUser,
    confirmAssign,
    closeDialog,
    createTicket,
    dismissToast,
  };
}
