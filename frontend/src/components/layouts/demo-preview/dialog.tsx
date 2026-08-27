import { ComplexDialog } from "@/components/ui/complex-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { type DemoTicket } from "@/components/layouts/demo-preview/types";
import { DEMO_USERS } from "@/components/layouts/demo-preview/data";

interface DemoAssignDialogProps {
  ticket: DemoTicket | null;
  selectedUserId: string | null;
  step: "assign-open" | "assigning" | "assigned" | "idle";
  onSelectUser: (userId: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function DemoAssignDialog({
  ticket,
  selectedUserId,
  step,
  onSelectUser,
  onConfirm,
  onClose,
}: DemoAssignDialogProps) {
  const { t } = useTranslation();
  const isOpen = step === "assign-open" || step === "assigning";
  const isSubmitting = step === "assigning";

  return (
    <ComplexDialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      onConfirm={onConfirm}
      isConfirmDisabled={!selectedUserId || isSubmitting}
      title={t("ticket.assign.title")}
      description={ticket?.title ?? t("ticket.assign.description")}
      cancelText={t("ticket.assign.actions.cancel")}
      confirmText={t("ticket.assign.actions.confirm")}
    >
      <div className="flex flex-col gap-2">
        <Label>{t("ticket.fields.assignee.label")}</Label>
        <Select value={selectedUserId ?? undefined} onValueChange={onSelectUser}>
          <SelectTrigger>
            <SelectValue placeholder={t("ticket.fields.assignee.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {DEMO_USERS.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </ComplexDialog>
  );
}
