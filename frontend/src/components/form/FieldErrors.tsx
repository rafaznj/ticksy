import { useFieldContext } from "@/hooks/use-form";

export function FieldErrors() {
  const field = useFieldContext();
  const errors = field.state.meta.errors;

  if (!field.state.meta.isTouched || errors.length === 0) return null;

  return (
    <p className="text-xs text-destructive">
      {errors.map((error) => (typeof error === "string" ? error : error?.message)).join(", ")}
    </p>
  );
}
