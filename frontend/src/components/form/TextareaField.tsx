import { type ComponentProps } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/hooks/use-form";
import { FieldErrors } from "@/components/form/FieldErrors";

interface TextareaFieldProps extends Omit<
  ComponentProps<typeof Textarea>,
  "value" | "onChange" | "onBlur"
> {
  label?: string;
  required?: boolean;
}

export function TextareaField({ label, required, ...props }: TextareaFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={field.name} className="flex items-center gap-0.5">
          {label}
          {required && (
            <span className="text-blue-700 font-semibold select-none" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}

      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
        {...props}
      />

      <FieldErrors />
    </div>
  );
}
