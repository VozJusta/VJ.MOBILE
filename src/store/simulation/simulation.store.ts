import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSimulationStore = create<ISimulationStore>()(
  persist((set) => ({
    simulationId: "",
    setSimulationId: (simulationId) => set({ simulationId }),
    clearSimulationId: () => set({ simulationId: "" }),
  })),
);
