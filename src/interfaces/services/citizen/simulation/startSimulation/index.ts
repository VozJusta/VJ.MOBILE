import { TCaseStatus } from "@/interfaces/components/CaseCard";

export enum Personality {
  CALM = "Calm",
  AGGRESSIVE = "Agressive",
  IMPARTIAL = "Impartial",
  EMPATHETIC = "Empathetic",
  PRAGMATIC = "Pragmatic",
  RESEARCHER = "Researcher",
}

export interface ISimulationResponse {
  id: string;
  citizen_id: string;
  personality: Personality;
  report_id: string;
  status: TCaseStatus;
}
