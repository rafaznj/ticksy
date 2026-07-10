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
      {label && (
        <Label htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}

      <Select value={field.state.value ?? ""} onValueChange={field.handleChange}>
        <SelectTrigger
          id={field.name}
          onBlur={field.handleBlur}
          aria-invalid={field.state.meta.errors.length > 0}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldErrors />
    </div>
  );
}
