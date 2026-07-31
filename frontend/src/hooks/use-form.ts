import { SelectField } from "@/components/form/SelectField";
import { SubmitButton } from "@/components/SubmitButton";
import { TextareaField } from "@/components/form/TextareaField";
import { TextField } from "@/components/form/TextField";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { AsyncSelectField } from "@/components/form/AsyncSelectField";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    AsyncSelectField,
  },
  formComponents: {
    SubmitButton,
  },
});
