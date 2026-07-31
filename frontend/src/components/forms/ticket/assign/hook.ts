import { useEffect } from "react";
import type { AssignTicketFormProps } from "@/components/forms/ticket/assign/types";
import { assignTicketFormSchema } from "@/components/forms/ticket/assign/validations";
import { useDialog } from "@/contexts/use-dialog";
import { useAppForm } from "@/hooks/use-form";
import { container } from "@/lib/inversifyJS/index.container";
import { useAssignTicket } from "@/modules/ticket/query-hooks/mutation/use-assign";
import type { IAssignTicketService } from "@/modules/ticket/services/contracts/assign";
import type { TicketEntity } from "@/modules/ticket/entity/ticket.entity";
import { DIALOG_KEYS } from "@/shared/constants/dialog-keys";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useStore } from "@tanstack/react-form";
import { useTranslation } from "react-i18next";
import type { IGetAssignableUsersPagedRepository } from "@/modules/user/repositories/contracts/get-assignable-paged";

export function useAssignTicketForm() {
  const { t } = useTranslation();
  const { isOpen, data, close } = useDialog<TicketEntity>(DIALOG_KEYS.ASSIGN_TICKET);

  const getAssignableUsersPagedService = container.get<IGetAssignableUsersPagedRepository>(
    SERVICE_TOKENS.GetAssignableUsersPagedService,
  );
  const assignTicketService = container.get<IAssignTicketService>(
    SERVICE_TOKENS.AssignTicketService,
  );

  const { mutateAsync: handleAssignTicket } = useAssignTicket(assignTicketService);

  const form = useAppForm({
    defaultValues: {
      id: data?.id,
    } as AssignTicketFormProps,
    validators: {
      onBlur: assignTicketFormSchema(t),
    },
    onSubmit: async (value) => {
      await handleAssignTicket(value.value);
      close();
    },
  });

  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        id: data.id,
        userId: data.assignedToId ?? "",
      } as AssignTicketFormProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, data?.id]);

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
    form,
    t,
    getAssignableUsersPagedService,
    isOpen,
    canSubmit,
    isSubmitting,
    isBlurred,
    handleSubmit,
    close,
  };
}
