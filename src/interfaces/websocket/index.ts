import { TCaseStatus } from "../components/CaseCard";
import {
  ISimulationResponse,
  Personality,
} from "../services/citizen/simulation/startSimulation";
import { Socket } from "socket.io-client";

export type TSimulationStatus =
  | "Waiting"
  | "InProgress"
  | "Completed"
  | "TimedOut";

export interface IWebSocketSimulationStarted {
  simulationId: string;
}

export interface IWebSocketSimulationWarning {
  message: string;
  remainingSecs: number;
}

export interface IWebSocketSimulationFinished {
  simulationId: string;
  status: TCaseStatus;
}

export interface IWebSocketSimulation {
  simulation: ISimulationResponse | null;
  isLoading: boolean;
  error: string | null;
  warning: IWebSocketSimulationWarning | null;
  simulationStatus: TSimulationStatus | null;
  socket: Socket | null;

  createAndStartSimulation: (personality: Personality) => Promise<void>;
  stopSimulation: () => void;
  clearSimulation: () => void;

  sendChat: (text: string) => Promise<void>;
  synthesizeAnswer: (text: string) => Promise<void>;

  aiResponse: string | null;
  audioFile: Blob | null;
  isSpeaking: boolean;

  clearMessages: () => void;
}
