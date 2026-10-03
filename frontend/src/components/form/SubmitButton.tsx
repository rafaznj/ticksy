import { useStore } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/hooks/use-form";

interface SubmitButtonProps {
  children: string;
  className?: string;
}

export const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit, isDirty] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
    state.isDirty,
  ]);

  return (
    <Button type="submit" className={className} disabled={isSubmitting || !canSubmit || !isDirty}>
      {children}
    </Button>
  );
};
