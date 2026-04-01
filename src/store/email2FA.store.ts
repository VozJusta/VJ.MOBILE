import { IEmail2FAStore } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useEmail2FAStorage = create<IEmail2FAStore>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: ""})
    }),
    { name: "2FA", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
