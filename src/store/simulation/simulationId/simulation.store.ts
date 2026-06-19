import { ISimulationStore } from "@/interfaces/services/simulation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useSimulationStorage = create<ISimulationStore>()(
  persist(
    (set) => ({
      simulationId: "",
      simulationReportId: "",
      setSimulationId: (simulationId) => set({ simulationId }),
      setSimulationReportId: (simulationReportId) => set({ simulationReportId }),
      clearSimulationId: () => set({ simulationId: "" }),
      clearSimulationReportId: () => set({ simulationReportId: "" }),
    }),
    {
      name: "simulation",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
