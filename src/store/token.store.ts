import { ITokenStore } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useTokenStorage = create<ITokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    { name: "token", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
