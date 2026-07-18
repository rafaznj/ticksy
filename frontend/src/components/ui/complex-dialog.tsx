import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type DialogWidth = "sm" | "md" | "lg" | "xl" | "xxl";

const DIALOG_WIDTH_MAP: Record<DialogWidth, string> = {
  sm: "24rem",
  md: "32rem",
  lg: "44rem",
  xl: "64rem",
  xxl: "72rem",
};

interface ComplexDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  cancelText?: string;
  confirmText?: string;
  isConfirmDisabled?: boolean;
  hideFooter?: boolean;
  hideCancelBtn?: boolean;
  width?: DialogWidth;
  contentClassName?: string;
}

export function ComplexDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  children,
  cancelText = "Cancel",
  confirmText = "Save",
  isConfirmDisabled,
  hideFooter,
  hideCancelBtn,
  width = "md",
  contentClassName,
}: ComplexDialogProps) {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onCancel?.();
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        style={{ maxWidth: DIALOG_WIDTH_MAP[width] }}
        className={contentClassName}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {!hideFooter && (
          <DialogFooter>
            {!hideCancelBtn && (
              <DialogClose asChild>
                <Button variant="outline">{cancelText}</Button>
              </DialogClose>
            )}
            <Button type="submit" onClick={onConfirm} disabled={isConfirmDisabled}>
              {confirmText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
