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

export interface IRequestCard {
  id: string;
  category_detected: string;
  title?: string;
  clientName: string;
  created_at: string;
  badgeColor: RequestCardBadgeColor;
  textBadge: RequestCardTextBadge;
  reportId?: string;
  isAccepting?: boolean;
  isRejecting?: boolean;
  onSeeReport?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}