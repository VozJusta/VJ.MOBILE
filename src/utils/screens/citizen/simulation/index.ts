import { ICategoryCard } from "@/interfaces/components/CategoryCard";
import { Personality } from "@/interfaces/services/citizen/simulation";

export const simulationPersonalities: ICategoryCard[] = [
  {
    title: "Calmo",
    description:
      "A IA é calma e ponderada, buscando sempre entender o contexto antes de responder.",
    icon: "sentiment-satisfied",
    colorIcon: "#34D399",
    bgIcon: "rgba(52,211,153,0.2)",
  },
  {
    title: "Agressivo",
    description:
      "A IA é agressiva e direta, respondendo de forma assertiva e sem rodeios.",
    icon: "sentiment-dissatisfied",
    colorIcon: "#EF4444",
    bgIcon: "rgba(239,68,68,0.2)",
  },
  {
    title: "Imparcial",
    description:
      "A IA é imparcial e objetiva, fornecendo respostas neutras e baseadas em fatos.",
    icon: "sentiment-neutral",
    colorIcon: "#FBBF24",
    bgIcon: "rgba(251,191,36,0.2)",
  },
  {
    title: "Empático",
    description:
      "A IA é empática e compreensiva, buscando se conectar emocionalmente com o usuário.",
    icon: "sentiment-very-satisfied",
    colorIcon: "#3B82F6",
    bgIcon: "rgba(59,130,246,0.2)",
  },
  {
    title: "Pragmático",
    description:
      "A IA é pragmática e focada em soluções, oferecendo respostas práticas e eficientes.",
    icon: "build",
    colorIcon: "#8B5CF6",
    bgIcon: "rgba(139,92,246,0.2)",
  },
  {
    title: "Pesquisador",
    description:
      "A IA é pesquisadora e detalhista, buscando informações aprofundadas para fornecer respostas completas.",
    icon: "search",
    colorIcon: "#10B981",
    bgIcon: "rgba(16,185,129,0.2)",
  },
];

export const personalityMap: Record<string, Personality> = {
  Calmo: Personality.CALM,
  Agressivo: Personality.AGGRESSIVE,
  Imparcial: Personality.IMPARTIAL,
  Empático: Personality.EMPATHETIC,
  Pragmático: Personality.PRAGMATIC,
  Pesquisador: Personality.RESEARCHER,
};