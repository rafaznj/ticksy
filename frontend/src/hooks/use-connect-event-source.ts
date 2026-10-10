import { TANSTACK_QUERY_KEYS } from "@/lib/tanstack/query-keys";
import { useAuthStore } from "@/lib/zustand/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useNotificationsStream() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) return;

    const source = new EventSource(`${import.meta.env.VITE_BACKEND_URL}/notifications/sse`, {
      withCredentials: true,
    });

    source.onopen = () =>
      queryClient.invalidateQueries({ queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_PAGED] });

    source.addEventListener("notification", () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_PAGED],
      });
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATION_COUNT],
      });
    });

    source.onerror = () => {
      if (source.readyState === EventSource.CLOSED) {
        console.error("EventSource connection closed.");
      }
    };

    return () => source.close();
  }, [user, queryClient]);
}
