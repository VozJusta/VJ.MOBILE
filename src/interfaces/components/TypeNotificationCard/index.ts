export enum TypeNotificationIcon {
  NOTIFICATION = "notifications",
  ALERT = "warning",
  DOCUMENTS = "article",
  SUCCESS = "verified",
}

export enum TypeNotificationColor {
  NOTIFICATION = "[#2B66E3]",
  ALERT = "[#FDD835]",
  DOCUMENTS = "[#F97316]",
  SUCCESS = "[#10B981]",
}

export enum TypeNotificationBgColor {
  NOTIFICATION = "[#2B66E3]/20",
  ALERT = "[#FDD835]/20",
  DOCUMENTS = "[#F97316]/20",
  SUCCESS = "[#10B981]/20",
}

export interface ITypeNotificationCard {
  icon: TypeNotificationIcon;
  iconColor?: string;
  bgColor?: string;
}
