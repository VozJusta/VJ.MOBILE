import { createSimulationSocket } from "@/helpers/websocket/simulationSocket";
import { Personality } from "@/interfaces/services/citizen/simulation/startSimulation";
import { IWebSocketSimulation } from "@/interfaces/websocket";
import { continueSimulation } from "@/services/ai/simulation/continueSimulation";
import { startSimulation } from "@/services/ai/simulation/startSimulation";
import { synthesizeAudio } from "@/services/ai/simulation/synthesizeAudio";
import { useSimulationStorage } from "@/store/simulation/simulationId/simulation.store";
import { create } from "zustand";

export const useWebSocketSimulation = create<IWebSocketSimulation>(
  (set, get) => ({
    simulation: null,
    isLoading: false,
    error: null,
    warning: null,
    simulationStatus: "Waiting",
    socket: null,
    aiResponse: null,
    audioFile: null,
    isSpeaking: false,
    simulationReportId: null,
    remainingSecs: null,

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
        useSimulationStorage.getState().setSimulationId(result.data!.id);

        const socket = createSimulationSocket();
        set({ socket });

        socket.on("connect", () => {
          socket.emit("simulation:start", { simulationId: result.data!.id });
        });

        socket.on("simulation:started", () => {
          set({ isLoading: false, simulationStatus: "InProgress" });
        });

        socket.on("simulation:warning", (payload) => {
          set({ warning: payload, remainingSecs: payload.remainingSecs });
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

        socket.on("simulation:report", (payload) => {
          set({ simulationReportId: payload.reportId });
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
        aiResponse: null,
        audioFile: null,
        isSpeaking: false,
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

    sendChat: async (text: string) => {
      const { simulation } = get();

      if (!simulation) return;

      const result = await continueSimulation({
        simulationId: simulation.id,
        text,
      });

      if (!result.success) {
        set({
          error: result.fields?.[0] || "Erro ao enviar mensagem",
        });
        return;
      }

      set({ aiResponse: result.data!.text });

      await get().synthesizeAnswer(result.data!.text);
    },

    synthesizeAnswer: async (text: string) => {
      set({ isSpeaking: true });

      const result = await synthesizeAudio({ text });

      if (!result.success) {
        set({ error: result.fields?.[0], isSpeaking: false });
        return;
      }

      set({ audioFile: result.data, isSpeaking: false });
    },

    clearMessages: () => {
      set({ aiResponse: null, audioFile: null });
    },
  }),
);
