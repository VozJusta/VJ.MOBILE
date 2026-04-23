export enum TypeNotificationIcon {
  NOTIFICATION = "notifications",
  ALERT = "warning",
  DOCUMENTS = "article",
  SUCCESS = "verified",
}

export enum TypeNotificationColor {
  NOTIFICATION = "#2B66E3",
  ALERT = "#FDD835",
  DOCUMENTS = "#F97316",
  SUCCESS = "#10B981",
}

export enum TypeNotificationBgColor {
  NOTIFICATION = "#0B192F",
  ALERT = "#FFEDD5",
  DOCUMENTS = "#575343",
  SUCCESS = "#161315",
}

export interface ITypeNotificationCard {
  icon: TypeNotificationIcon;
  iconColor?: string;
  bgColor?: string;
}