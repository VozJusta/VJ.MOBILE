export enum RequestCardBadgeColor {
  ACCEPTED = "#34D399",
  REJECTED = "#EF4444",
  PENDING = "#F59E0B",
}

export enum RequestCardTextBadge {
  ACCEPTED = "Aceito",
  REJECTED = "Recusado",
  PENDING = "Pendente",
}

export interface RequestCardProps {
  id: string;
  area: string;
  nameCase: string;
  nameCitizen: string;
  requestDate: string;
  badgeColor: RequestCardBadgeColor;
  textBadge: RequestCardTextBadge;
}