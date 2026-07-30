import { useEffect, useMemo } from "react";

import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/contexts/use-dialog";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import type { IUpdateTicketService } from "@/modules/ticket/services/contracts/update";
import { useUpdateTicket } from "@/modules/ticket/query-hooks/mutation/use-update";
import type { EditTicketFormProps } from "@/components/forms/ticket/edit/types";
import { editTicketFormSchema } from "@/components/forms/ticket/edit/validations";
import { TicketPriorityEnum } from "@/modules/ticket/enums/priority.enum";

export function useEditTicketForm() {
  const { t } = useTranslation();

  const {
    isOpen,
    data: selectedTicket,
    close,
  } = useDialog<TicketEntity>(DIALOG_KEYS.UPDATE_TICKET);

  const updateTicketService = container.get<IUpdateTicketService>(
    SERVICE_TOKENS.UpdateTicketService,
  );

  const { mutateAsync: updateTicket } = useUpdateTicket(updateTicketService);

  const priorityOptions = useMemo(
    () => [
      { value: TicketPriorityEnum.LOW, label: t("ticket.priority.low") },
      { value: TicketPriorityEnum.MEDIUM, label: t("ticket.priority.medium") },
      { value: TicketPriorityEnum.HIGH, label: t("ticket.priority.high") },
      { value: TicketPriorityEnum.URGENT, label: t("ticket.priority.urgent") },
    ],
    [t],
  );

  const form = useAppForm({
    defaultValues: {
      title: selectedTicket?.title,
      description: selectedTicket?.description,
      priority: selectedTicket?.priority,
    } as EditTicketFormProps,
    validators: {
      onBlur: editTicketFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      if (!selectedTicket?.id) return;

      await updateTicket({
        id: selectedTicket.id,
        data: value,
      });

      close();
    },
  });

  useEffect(() => {
    if (isOpen && selectedTicket) {
      form.reset({
        title: selectedTicket.title,
        description: selectedTicket.description,
        priority: selectedTicket.priority,
      });
    }
  }, [form, isOpen, selectedTicket]);

  const [canSubmit, isSubmitting, isBlurred] = useStore(form.store, (state) => [
    state.canSubmit,
    state.isSubmitting,
    state.isBlurred,
  ]);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    event?.stopPropagation();
    await form.handleSubmit();
  };

  return {
    t,
    isOpen,
    form,
    priorityOptions,
    canSubmit,
    isSubmitting,
    isBlurred,
    close,
    handleSubmit,
  };
}
