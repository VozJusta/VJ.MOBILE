import { Personality } from "@/interfaces/services/citizen/simulation/startSimulation";
import { IWebSocketSimulation } from "@/interfaces/websocket";
import { startSimulation } from "@/services/ai/simulation";
import { useSimulationStore } from "@/store/simulation/simulationId/simulation.store";
import { createSimulationSocket } from "@/store/simulation/websocket";
import { create } from "zustand";

export const useWebSocketSimulation = create<IWebSocketSimulation>(
  (set, get) => ({
    simulation: null,
    isLoading: false,
    error: null,
    warning: null,
    simulationStatus: "Waiting",
    socket: null,

    createAndStartSimulation: async (personality: Personality) => {
      set({ isLoading: true, error: null, warning: null });

      try {
        const result = await startSimulation(personality);

        if (!result.success) {
          set({
            error: result.fields?.[0] || "Erro ao iniciar simulação",
            isLoading: false,
          });
          return;
        }

        set({
          simulation: result.data || null,
          simulationStatus: "InProgress",
        });
        useSimulationStore.getState().setSimulationId(result.data!.id);

        const socket = createSimulationSocket();
        set({ socket });

        socket.on("connect", () => {
          socket.emit("simulation:start", { simulationId: result.data!.id });
        });

        socket.on("simulation:started", () => {
          set({ isLoading: false, simulationStatus: "InProgress" });
        });

        socket.on("simulation:warning", (payload) => {
          set({ warning: payload });
        });

        socket.on("simulation:end", (payload) => {
          set({ simulationStatus: payload.status });
          socket.disconnect();
          set({ socket: null });
        });

        socket.on("connect_error", (err) => {
          set({ error: "Erro de conexão com o servidor de simulação" });
          socket.disconnect();
          set({ socket: null });
        });
      } catch {
        set({
          error: "Erro ao iniciar simulação. Tente novamente mais tarde.",
          isLoading: false,
        });
      }
    },

    clearSimulation: () => {
      const { socket } = get();

      socket?.disconnect();

      set({
        simulation: null,
        error: null,
        warning: null,
        simulationStatus: "Waiting",
        socket: null,
      });
    },

    stopSimulation: () => {
      const { socket, simulation } = get();

      if (socket && simulation) {
        socket.emit("simulation:stop", { simulationId: simulation.id });
        socket.disconnect();
      }

      set({
        simulationStatus: "Waiting",
        socket: null,
      });
    },
  }),
);
