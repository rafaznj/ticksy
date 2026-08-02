import { QueryClient, type QueryMeta } from "@tanstack/react-query";

export interface QueryContext {
  client: QueryClient;
  queryKey: unknown[];
  signal: AbortSignal;
  meta: QueryMeta | undefined;
  pageParam?: unknown;
  direction?: unknown;
}
