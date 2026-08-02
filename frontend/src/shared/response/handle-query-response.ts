import { toast } from "sonner";
import { AppError } from "@/shared/errors/app-error";
import type { QueryContext } from "@/lib/tanstack/query-context";
import { DEFAULT_RETRY_COUNT } from "@/lib/tanstack/query-client";

interface Params<T> {
  response: T | AppError;
  context: QueryContext;
  onSuccess?: (response: T) => void;
  onError?: (err: AppError) => void;
  disableRetryCheck?: boolean;
}

function shouldHandleError(context: QueryContext, disableRetryCheck?: boolean): boolean {
  if (disableRetryCheck) {
    return true;
  }

  const queryState = context?.client.getQueryState(context?.queryKey);
  return queryState?.fetchFailureCount === DEFAULT_RETRY_COUNT;
}

export default function handleQueryResponse<T>(params: Params<T>): T {
  const { response, onSuccess, onError, context, disableRetryCheck } = params;

  if (response instanceof AppError) {
    if (shouldHandleError(context, disableRetryCheck)) {
      toast.error(response.message);
      onError?.(response);
    }

    throw response;
  }

  onSuccess?.(response);
  return response;
}
