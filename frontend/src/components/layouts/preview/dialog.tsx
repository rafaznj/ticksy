import { AnimatePresence, motion } from "motion/react";
import { LuLoader, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { type PreviewTicket } from "@/components/layouts/preview/types";
import { PREVIEW_USERS } from "@/components/layouts/preview/data";

interface PreviewAssignDialogProps {
  ticket: PreviewTicket | null;
  selectedUserId: string | null;
  step: "assign-open" | "assigning" | "assigned" | "idle";
  onSelectUser: (userId: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function PreviewAssignDialog({
  ticket,
  selectedUserId,
  step,
  onSelectUser,
  onConfirm,
  onClose,
}: PreviewAssignDialogProps) {
  const { t } = useTranslation();
  const isOpen = step === "assign-open" || step === "assigning";
  const isSubmitting = step === "assigning";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="demo-assign-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm"
          onClick={() => !isSubmitting && onClose()}
        >
          <motion.div
            key="demo-assign-card"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xs rounded-xl border bg-background p-4 text-sm shadow-2xl"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold">{t("ticket.assign.title")}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{ticket?.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
              >
                <LuX className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs">{t("ticket.fields.assignee.label")}</Label>
              <Select value={selectedUserId ?? undefined} onValueChange={onSelectUser}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder={t("ticket.fields.assignee.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {PREVIEW_USERS.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                {t("ticket.assign.actions.cancel")}
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={onConfirm}
                disabled={!selectedUserId || isSubmitting}
              >
                {isSubmitting && <LuLoader className="mr-1.5 size-3.5 animate-spin" />}
                {t("ticket.assign.actions.confirm")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
