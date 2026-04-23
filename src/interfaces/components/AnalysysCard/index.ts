export interface IAnalysysCard {
  title: IAnalysysCardTitle;
  text: string;
}

export enum IAnalysysCardTitle {
  FACTS = "Fatos relevantes",
  LEGAL_ANALYSIS = "Fundamentação sugerida",
  SIMPLIFIED_EXPLANATION = "Explicação simplificada",
}