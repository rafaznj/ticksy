import { QueryClient } from "@tanstack/react-query";

export const DEFAULT_STALE_TIME = 1000 * 60 * 5;
export const DEFAULT_RETRY_COUNT = 3;

const tanStackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: DEFAULT_STALE_TIME,
      refetchInterval: false,
      refetchOnWindowFocus: true,
      retry: DEFAULT_RETRY_COUNT,
    },
  },
});

export default tanStackQueryClient;
