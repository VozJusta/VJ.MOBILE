import { IRoleStore } from "@/interfaces/store/roleStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useRolesStorage = create<IRoleStore>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    { name: "role", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
