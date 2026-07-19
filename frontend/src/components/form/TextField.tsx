import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/hooks/use-form";
import { FieldErrors } from "@/components/form/FieldErrors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        <Label htmlFor={field.name} className="flex items-center gap-0.5">
          {label}
          {required && (
            <span className="text-blue-700 font-semibold select-none" aria-hidden="true">
              *
            </span>
          )}
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
          aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
          className={cn("h-11 pr-11", props.className)}
          {...props}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowPassword((v) => !v)}
            className=" absolute inset-y-0 right-0 h-full w-11 rounded-none border-0 shadow-none hover:bg-transparent focus-visible:ring-0 active:translate-y-0 cursor-pointer"
          >
            {" "}
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}{" "}
          </Button>
        )}
      </div>
      <FieldErrors />
    </div>
  );
}
