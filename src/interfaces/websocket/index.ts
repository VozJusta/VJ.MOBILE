import { TCaseStatus } from "../components/CaseCard";
import {
  ISimulationResponse,
  Personality,
} from "../services/citizen/simulation";
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
  simulation: ISimulationResponse;
  isLoading: boolean;
  error: string | null;
  warning: IWebSocketSimulationWarning | null;
  simulationStatus: TSimulationStatus;
  socket: Socket | null;

  createAndStartSimulation: (personality: Personality) => Promise<void>;
  stopSimulation: () => void;
  clearSimulation: () => void;
}
