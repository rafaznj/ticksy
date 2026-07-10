import { SelectField } from "@/components/SelectField";
import { SubmitButton } from "@/components/SubmitButton";
import { TextareaField } from "@/components/TextareaField";
import { TextField } from "@/components/TextField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
});
