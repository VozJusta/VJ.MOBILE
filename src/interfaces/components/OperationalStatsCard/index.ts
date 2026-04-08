export enum OperationalStatsCardIcon {
  ACCEPTED = "check-circle",
  REJECTED = "cancel",
  PENDING = "hourglass-bottom",
}

export enum OperationalStatsCardIconColor {
  ACCEPTED = "#34D399",
  REJECTED = "#EF4444",
  PENDING = "#F59E0B",
}

export enum OperationalStatsCardBgColor {
  ACCEPTED = "rgba(52, 211, 153, 0.05)",
  REJECTED = "rgba(239, 68, 68, 0.05)",
  PENDING = "rgba(245, 158, 11, 0.05)",
}


export enum OperationalStatsCardBorderColor {
  ACCEPTED = "rgba(52, 211, 153, 0.1)",
  REJECTED = "rgba(239, 68, 68, 0.1)",
  PENDING = "rgba(245, 158, 11, 0.1)",
}

export interface OperationalStatsCardProps {
  icon: OperationalStatsCardIcon;
  title: string;
  stat: string;
  iconColor: OperationalStatsCardIconColor;
  bgColor: OperationalStatsCardBgColor;
  borderColor: OperationalStatsCardBorderColor;
}