import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { container } from "@/lib/inversifyJS/index.container";
import { INFRASTRUCTURE_TOKENS } from "@/shared/di/tokens.infrastructure";
import { SERVICE_TOKENS } from "@/shared/di/tokens.services";
import { useAuthStore } from "@/lib/zustand/use-auth";

import { AppError } from "@/shared/errors/app-error";
import type { IErrorHandlerService } from "@/shared/errors/contracts/error";
import type { IRefreshService } from "@/modules/auth/services/contracts/refresh";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;

function isAuthEndpoint(url?: string): boolean {
  return Boolean(url?.includes("auth/login") || url?.includes("auth/refresh"));
}

export const onResponseFulfilled = (response: AxiosResponse) => response;

export const onResponseRejected = async (error: AxiosError) => {
  const errorHandler = container.get<IErrorHandlerService>(
    INFRASTRUCTURE_TOKENS.ErrorHandlerService,
  );

  const errorHandled = errorHandler.handle(error);

  const originalRequest = error.config as RetryableConfig;
  const shouldTryRefresh =
    error.response?.status === 401 && !isRefreshing && !isAuthEndpoint(originalRequest?.url);

  if (shouldTryRefresh) {
    isRefreshing = true;

    try {
      const refreshService = container.get<IRefreshService>(SERVICE_TOKENS.RefreshService);
      const response = await refreshService.execute();

      if (response instanceof AppError) {
        useAuthStore.getState().clearAuth();
        useAuthStore.getState().logout();
      }
    } finally {
      isRefreshing = false;
    }
  }

  return Promise.reject(errorHandled);
};
