import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { RefreshQueue } from "./refresh-queue";
import { useAuthStore } from "@/lib/zustand/use-auth";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const refreshQueue = new RefreshQueue();

function isAuthEndpoint(url?: string) {
  return Boolean(url?.includes("/auth/login") || url?.includes("/auth/refresh"));
}

export function attachAuthInterceptor(apiClient: AxiosInstance) {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableConfig;

      const shouldTryRefresh =
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint(originalRequest.url);

      if (!shouldTryRefresh) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshQueue.run(() => refreshAccessToken(apiClient));
        return apiClient(originalRequest);
      } catch (refreshError) {
        handleRefreshFailure();
        return Promise.reject(refreshError);
      }
    },
  );
}

async function refreshAccessToken(httpClient: AxiosInstance) {
  const { data } = await httpClient.post("/auth/refresh");
  useAuthStore.getState().setAuth(data.accessToken, useAuthStore.getState().user!);
}

function handleRefreshFailure() {
  useAuthStore.getState().clearAuth();
  useAuthStore.getState().logout();
}
