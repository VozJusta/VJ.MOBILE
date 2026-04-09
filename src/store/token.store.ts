<<<<<<< HEAD
import { IXTokenStore } from "@/interfaces/interfaces";
import {
  IAccessTokenStore,
  IRefreshTokenStore,
} from "@/interfaces/services/token/token";
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

export const useAccessTokenStorage = create<IAccessTokenStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setTokens: (accessToken) => set({ accessToken }),
      clearTokens: () => set({ accessToken: null }),
    }),
    { name: "access_tokens", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export const useRefreshTokenStorage = create<IRefreshTokenStore>()(
  persist(
    (set) => ({
      refreshToken: null,
      setTokens: (refreshToken) => set({ refreshToken }),
      clearTokens: () => set({ refreshToken: null }),
    }),
    { name: "refresh_tokens", storage: createJSONStorage(() => AsyncStorage) },
=======
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useRolesStorage = create<{
  role: string | null;
  setRole: (role: string) => void;
  clearRole: () => void;
}>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    { name: "role", storage: createJSONStorage(() => AsyncStorage) },
>>>>>>> dfcf6ac563b0c035a575b4b127b0464da17d9308
  ),
);
