import { IXTokenStore } from "@/interfaces/interfaces";
import { ITokenStore } from "@/interfaces/services/token/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useXTokenStorage = create<IXTokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    { name: "token", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export const useTokenStorage = create<ITokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: "token", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
