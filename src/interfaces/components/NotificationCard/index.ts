import { TypeNotificationCardProps } from "../TypeNotificationCard";

export type NotificationCardProps = TypeNotificationCardProps & {
  id: string;
  title: string;
  description: string;
  date: Date;
};