import { type ComponentProps } from "react";

import { Textarea } from "@/components/primitives/textarea";
import { Label } from "@/components/primitives/label";
import { useFieldContext } from "@/hooks/use-form";
import { FieldErrors } from "@/components/FieldErrors";

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
        <Label htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}

      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={field.state.meta.errors.length > 0}
        {...props}
      />

      <FieldErrors />
    </div>
  );
}
