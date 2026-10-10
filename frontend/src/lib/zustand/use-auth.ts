import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserDto } from "@/modules/user/dto/user.dto";

interface AuthState {
  accessToken: string | null;
  user: UserDto | null;
  setAuth: (accessToken: string, user: UserDto) => void;
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
