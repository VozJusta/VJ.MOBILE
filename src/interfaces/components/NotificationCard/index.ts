import { ITypeNotificationCard } from "../TypeNotificationCard";

export type TNotificationCard = ITypeNotificationCard & {
  id: string;
  title: string;
  description: string;
  date: Date;
};