import { ReactNode } from "react";

export enum AnalysysConcludedProbability {
  LOW = "Baixa",
  MEDIUM = "Média",
  HIGH = "Alta",
}

export interface IAnalysysConcludedTemplateProps {
  title: string;
  description: string;
  category: string;
  probability: AnalysysConcludedProbability;
  extraActions?: ReactNode;
}
