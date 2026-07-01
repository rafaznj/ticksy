import { create } from "zustand";

interface useUserState {
  user: undefined;
  expiresAccessToken: Date | undefined;
  logout: () => void;
}

export const useUser = create<useUserState>(() => ({
  user: undefined,
  expiresAccessToken: undefined,
  logout: () => {
    console.warn("Router not initialized yet");
  },
}));
