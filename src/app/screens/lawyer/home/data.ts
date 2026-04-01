import { RequestCardProps } from "@/interfaces/components/RequestCard";
import { StatsCardBgColor, StatsCardIcon, StatsCardIconColor, StatsCardProps } from "@/interfaces/components/StatCard";

export const lawyerStats: StatsCardProps[] = [
  {
    icon: StatsCardIcon.REQUEST,
    iconColor: StatsCardIconColor.REQUEST,
    title: "SOLICITAÇÕES NO MÊS",
    stat: "142",
    bgColor: StatsCardBgColor.REQUEST,
  },
  {
    icon: StatsCardIcon.ACCEPTED,
    iconColor: StatsCardIconColor.ACCEPTED,
    title: "CASOS ACEITOS",
    stat: "98",
    bgColor: StatsCardBgColor.ACCEPTED,
  },
  {
    icon: StatsCardIcon.SPEED,
    iconColor: StatsCardIconColor.SPEED,
    title: "MÉDIA DE RESPOSTA",
    stat: "1.2 dias",
    bgColor: StatsCardBgColor.SPEED,
  },
];

export const lawyerRequests: RequestCardProps[] = [
  {
    title: "Divulgação de conteúdo digital",
    score: 85,
    badgeColor: "#34D399", 
    textBadge: "DIGITAL",
  },
  {
    title: "Assédio no ambiente de trabalho",
    score: 78,
    badgeColor: "#F59E0B", 
    textBadge: "TRABALHO",
  },
  {
    title: "Violência doméstica",
    score: 92,
    badgeColor: "#EF4444", 
    textBadge: "DOMÉSTICA",
  }
]