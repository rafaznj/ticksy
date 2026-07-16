import type { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/lib/zustand/use-auth";

export const onRequestFulfilled = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export const onRequestRejected = (error: Error) => Promise.reject(error);
