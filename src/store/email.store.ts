import { IEmailStore } from "@/interfaces/store/emailStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useEmailStorage = create<IEmailStore>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: "" }),
    }),
    { name: "email", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
