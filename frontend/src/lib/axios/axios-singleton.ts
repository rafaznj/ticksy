// lib/axios/axios-singleton.ts
import axios, { type AxiosInstance } from "axios";
import { injectable } from "inversify";

import { attachAuthInterceptor } from "@/infrastructure/interceptors/auth-interceptor";
import { useAuthStore } from "@/lib/zustand/use-auth";

@injectable()
export class AxiosSingleton {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });

    this.client.interceptors.request.use((config) => {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    attachAuthInterceptor(this.client);
  }
}
