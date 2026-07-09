import { create } from "zustand";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  setHydrated: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isHydrated: false,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setHydrated: () => set({ isHydrated: true }),
  logout: () => {},
}));
