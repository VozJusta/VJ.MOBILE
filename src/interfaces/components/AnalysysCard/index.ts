export interface AnalysysCardProps {
  title: AnalysysCardTitle;
  text: string;
}

export enum AnalysysCardTitle {
  FACTS = "Fatos relevantes",
  LEGAL_ANALYSIS = "Fundamentação sugerida",
  SIMPLIFIED_EXPLANATION = "Explicação simplificada",
}