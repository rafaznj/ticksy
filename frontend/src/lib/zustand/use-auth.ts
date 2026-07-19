import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserEntity } from "@/modules/user/entity/user.entity";

interface AuthState {
  accessToken: string | null;
  user: UserEntity | null;
  setAuth: (accessToken: string, user: UserEntity) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: (accessToken, user) =>
        set({
          accessToken,
          user,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: "auth",
    },
  ),
);
