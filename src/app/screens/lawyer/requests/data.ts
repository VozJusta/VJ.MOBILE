import { IRequestCard, RequestCardBadgeColor, RequestCardTextBadge } from "@/interfaces/components/RequestCard";

export const requestsCards: IRequestCard[] = [
  {
    id: "1",
    area: "Direito Civil",
    badgeColor: RequestCardBadgeColor.PENDING,
    textBadge: RequestCardTextBadge.PENDING,
    nameCase: "Ricardo Silva vs. João Pereira",
    nameCitizen: "Ricardo Silva",
    requestDate: "12/09/2024",
  },
  {
    id: "2",
    area: "Direito Penal",
    badgeColor: RequestCardBadgeColor.ACCEPTED,
    textBadge: RequestCardTextBadge.ACCEPTED,
    nameCase: "Maria Oliveira vs. Carlos Souza",
    nameCitizen: "Maria Oliveira",
    requestDate: "10/09/2024",
  },
  {
    id: "3",
    area: "Direito Trabalhista",
    badgeColor: RequestCardBadgeColor.REJECTED,
    textBadge: RequestCardTextBadge.REJECTED,
    nameCase: "Ana Costa vs. Empresa XYZ",
    nameCitizen: "Ana Costa",
    requestDate: "08/09/2024",
  },
];