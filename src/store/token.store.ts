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
  ),
);
