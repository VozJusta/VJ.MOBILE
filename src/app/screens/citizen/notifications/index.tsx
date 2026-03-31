import {
  TypeNotificationBgColor,
  TypeNotificationColor,
  TypeNotificationIcon,
} from "@/interfaces/components/TypeNotificationCard";
import { NotificationTemplateProps } from "@/interfaces/template/NotificationTemplate";
import NotificationTemplate from "@/template/notification";

export const data: NotificationTemplateProps = {
  notifications: [
    {
      id: "1",
      title: "Nova denúncia recebida",
      description: "Você recebeu uma nova denúncia sobre poluição sonora.",
      date: new Date("2024-06-01T10:30:00"),
      icon: TypeNotificationIcon.NOTIFICATION,
      iconColor: TypeNotificationColor.NOTIFICATION,
      bgColor: TypeNotificationBgColor.NOTIFICATION,
    },
  ],
};

export default function Notifications() {
  return <NotificationTemplate notifications={data.notifications} />;
}
