import { TCaseStatus } from "../components/CaseCard";

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
