export interface IAnalysysCard {
  title: IAnalysysCardTitle;
  text: string;
}

export enum IAnalysysCardTitle {
  IA_CONVERSATION = "Conversa com a IA",
  LEGAL_ANALYSIS = "Fundamentação sugerida",
  SIMPLIFIED_EXPLANATION = "Explicação simplificada",
}