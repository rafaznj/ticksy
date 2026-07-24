import type { CreateTicketFormProps } from "@/components/forms/ticket/create/types";
import { createTicketFormSchema } from "@/components/forms/ticket/create/validations";
import { useDialog } from "@/contexts/use-dialog";
import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { TicketPriorityEnum } from "@/modules/ticket/enums/ticket-priority.enum";
import { useCreateTicket } from "@/modules/ticket/query-hooks/mutation/use-create-ticket";
import type { ICreateTicketService } from "@/modules/ticket/services/contracts/create";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useCreateTicketForm() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { isOpen, close } = useDialog(DIALOG_KEYS.CREATE_TICKET);

  const createTicketService = container.get<ICreateTicketService>(
    SERVICE_TOKENS.CreateTicketService,
  );

  const priorityOptions = useMemo(
    () => [
      { value: TicketPriorityEnum.LOW, label: t("ticket.create.fields.priority.options.low") },
      {
        value: TicketPriorityEnum.MEDIUM,
        label: t("ticket.create.fields.priority.options.medium"),
      },
      { value: TicketPriorityEnum.HIGH, label: t("ticket.create.fields.priority.options.high") },
      {
        value: TicketPriorityEnum.URGENT,
        label: t("ticket.create.fields.priority.options.urgent"),
      },
    ],
    [t],
  );

  const { mutateAsync: handleCreateTicket } = useCreateTicket(createTicketService, {
    onSuccess: close,
  });

  const form = useAppForm({
    defaultValues: {
      createdById: user?.id,
    } as CreateTicketFormProps,
    onSubmit: async (value) => {
      await handleCreateTicket(value.value);
    },
    validators: {
      onBlur: createTicketFormSchema(t),
    },
  });

  const [canSubmit, isSubmitting, isBlurred] = useStore(form.store, (state) => [
    state.canSubmit,
    state.isSubmitting,
    state.isBlurred,
  ]);

  const handleSubmit = async (event?: React.SubmitEvent<HTMLFormElement>) => {
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
