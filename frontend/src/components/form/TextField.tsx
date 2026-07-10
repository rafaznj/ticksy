import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFieldContext } from "@/hooks/use-form";
import { FieldErrors } from "@/components/form/FieldErrors";

interface TextFieldProps extends Omit<
  ComponentProps<typeof Input>,
  "value" | "onChange" | "onBlur"
> {
  label?: string;
  required?: boolean;
}

export function TextField({ label, required, type, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}

      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={inputType}
          value={field.state.value ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={field.state.meta.errors.length > 0}
          {...props}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-1 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        )}
      </div>

      <FieldErrors />
    </div>
  );
}
