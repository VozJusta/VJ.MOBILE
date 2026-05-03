import { ISimulationStore } from "@/interfaces/services/simulation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSimulationStorage = create<ISimulationStore>()(
  persist(
    (set) => ({
      simulationId: "",
      setSimulationId: (simulationId) => set({ simulationId }),
      clearSimulationId: () => set({ simulationId: "" }),
    }),
    {
      name: "simulation",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
