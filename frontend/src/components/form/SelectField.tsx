import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/hooks/use-form";
import { FieldErrors } from "@/components/form/FieldErrors";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
}

export function SelectField({ label, required, placeholder, options }: SelectFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-start gap-3">
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

        <Select value={field.state.value ?? ""} onValueChange={field.handleChange}>
          <SelectTrigger
            id={field.name}
            onBlur={field.handleBlur}
            aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent position="popper">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <FieldErrors />
    </div>
  );
}
