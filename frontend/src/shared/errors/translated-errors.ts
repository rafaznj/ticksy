import i18n from "@/assets/i18n";
import type { ErrorMessage } from "./error-message";

export function translateErrors(errors: ErrorMessage[]): string[] {
  return errors.map((error) =>
    i18n.t(error.key as never, {
      defaultValue: error.value,
      ...error.params,
    }),
  );
}
